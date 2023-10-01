import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ESSNNumbersActionType,
  ISSNNumberRequestData,
} from '../../../types/ssnNumbersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteSSNNumber = async (
  ssnNumberId: number,
): Promise<IApiResponse<ISSNNumberRequestData>> => {
  let response: IApiResponse<ISSNNumberRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/ssn/${ssnNumberId}`,
    withCredentials: true,
  });

  return response;
};

const useDeleteSSNNumberMutation = (
  onClose: () => void,
  updateSSNNumbersState: React.Dispatch<any>,
  ssnNumberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteSSNNumber(ssnNumberId), {
    onSuccess: (response) => {
      console.log('response', response.data);
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
  });
};

export default useDeleteSSNNumberMutation;
