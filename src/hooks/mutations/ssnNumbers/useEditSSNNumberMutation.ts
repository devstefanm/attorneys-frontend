import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ESSNNumbersActionType,
  ISSNNumberRequestData,
} from '../../../types/ssnNumbersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editSSNNumber = async (
  ssnNumberId: number,
  ssnNumberRequestData: ISSNNumberRequestData,
): Promise<IApiResponse<ISSNNumberRequestData>> => {
  let response: IApiResponse<ISSNNumberRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/ssn/${ssnNumberId}`,
    data: ssnNumberRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditSSNNumberMutation = (
  onClose: () => void,
  updateSSNNumbersState: React.Dispatch<any>,
  ssnNumberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (ssnNumberRequestData: ISSNNumberRequestData) =>
      editSSNNumber(ssnNumberId, ssnNumberRequestData),
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
          queryClient.invalidateQueries({ queryKey: ['ssnNumber'] });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.data?.message) {
          updateSSNNumbersState({
            type: ESSNNumbersActionType.openErrorSnackbar,
            payload: true,
          });
        }
        return {
          error,
          message: error?.response?.data?.message || 'Error has occured',
        };
      },
    },
  );
};

export default useEditSSNNumberMutation;
