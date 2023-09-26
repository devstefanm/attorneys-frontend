import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ESSNNumbersActionType,
  ISSNNumberRequestData,
} from '../../../types/ssnNumbersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewSSNNumber = async (
  ssnNumberRequestData: ISSNNumberRequestData,
): Promise<IApiResponse<ISSNNumberRequestData>> => {
  let response: IApiResponse<ISSNNumberRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/ssn',
    data: ssnNumberRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewSSNNumberMutation = (
  onClose: () => void,
  updateSSNNumbersState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (ssnNumberRequestData: ISSNNumberRequestData) =>
      addNewSSNNumber(ssnNumberRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateSSNNumbersState({
            type: ESSNNumbersActionType.resetSSNNumberFormData,
          });
          updateSSNNumbersState({
            type: ESSNNumbersActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['ssnNumbersList'] });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        updateSSNNumbersState({
          type: ESSNNumbersActionType.openErrorSnackbar,
          payload: true,
        });
        return {
          error,
          message: error?.response?.data?.message || 'Error has occured',
        };
      },
    },
  );
};

export default useAddNewSSNNumberMutation;
