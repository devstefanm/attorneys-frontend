import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EExecutorsActionType,
  IExecutorRequestData,
} from '../../../types/executorsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteExecutor = async (
  executorId: number,
): Promise<IApiResponse<IExecutorRequestData>> => {
  let response: IApiResponse<IExecutorRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/executor/${executorId}`,
    withCredentials: true,
  });

  return response;
};

const useDeleteExecutorMutation = (
  onClose: () => void,
  updateExecutorsState: React.Dispatch<any>,
  executorId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteExecutor(executorId), {
    onSuccess: (response) => {
      if (!response.data.error) {
        updateExecutorsState({
          type: EExecutorsActionType.resetExecutorFormData,
        });
        updateExecutorsState({
          type: EExecutorsActionType.openSuccessSnackbar,
          payload: true,
        });
        onClose();
        queryClient.invalidateQueries({ queryKey: ['executorsList'] });
      }
      return response.data.message;
    },
    onError: (error: any) => {
      console.error(error);
      if (error?.response?.data?.message) {
        updateExecutorsState({
          type: EExecutorsActionType.openErrorSnackbar,
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

export default useDeleteExecutorMutation;
