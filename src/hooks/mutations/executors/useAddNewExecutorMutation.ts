import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EExecutorsActionType,
  IExecutorRequestData,
} from '../../../types/executorsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';

const addNewExecutor = async (
  executorRequestData: IExecutorRequestData,
): Promise<IApiResponse<IExecutorRequestData>> => {
  let response: IApiResponse<IExecutorRequestData>;

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/executors',
      data: executorRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useAddNewExecutorMutation = (
  onClose: () => void,
  updateExecutorsState: React.Dispatch<any>,
) => {
  return useMutation(
    (executorRequestData: IExecutorRequestData) =>
      addNewExecutor(executorRequestData),
    {
      onSuccess: (response) => {
        updateExecutorsState({
          type: EExecutorsActionType.resetExecutorFormData,
        });
        if (!response.data.error) {
          onClose();
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewExecutorMutation;
