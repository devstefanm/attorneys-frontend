import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EExecutorsActionType,
  IExecutorRequestData,
} from '../../../types/executorsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewExecutor = async (
  executorRequestData: IExecutorRequestData,
): Promise<IApiResponse<IExecutorRequestData>> => {
  let response: IApiResponse<IExecutorRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/executors',
    data: executorRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewExecutorMutation = (
  onClose: () => void,
  updateExecutorsState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (executorRequestData: IExecutorRequestData) =>
      addNewExecutor(executorRequestData),
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
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        updateExecutorsState({
          type: EExecutorsActionType.openErrorSnackbar,
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

export default useAddNewExecutorMutation;
