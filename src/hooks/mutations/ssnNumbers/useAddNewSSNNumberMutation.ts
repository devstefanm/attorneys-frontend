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

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/ssn',
      data: ssnNumberRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

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
          onClose();
          queryClient.invalidateQueries({ queryKey: ['ssnNumbersList'] });
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewSSNNumberMutation;
