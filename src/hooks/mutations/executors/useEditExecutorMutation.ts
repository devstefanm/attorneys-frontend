import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EExecutorsActionType,
  IExecutorRequestData,
} from '../../../types/executorsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editExecutor = async (
  executorId: number,
  executorRequestData: IExecutorRequestData,
): Promise<IApiResponse<IExecutorRequestData>> => {
  let response: IApiResponse<IExecutorRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/executor/${executorId}`,
    data: executorRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditExecutorMutation = (
  onClose: () => void,
  updateExecutorsState: React.Dispatch<any>,
  executorId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (executorRequestData: IExecutorRequestData) =>
      editExecutor(executorId, executorRequestData),
    {
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
          queryClient.invalidateQueries({ queryKey: ['executor'] });
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
    },
  );
};

export default useEditExecutorMutation;
