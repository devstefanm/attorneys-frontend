import { setupAxios } from '../../../libs/axios/setupAxios';
import { ETransactionsActionType } from '../../../types/transactionsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const importTransactionsList = async (
  file: File,
): Promise<IApiResponse<number[] | undefined>> => {
  let response: IApiResponse<number[]>;

  const formData = new FormData();
  formData.append('file', file);

  response = await setupAxios({
    method: 'post',
    url: 'api/import-transactions-list',
    data: formData,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

const useImportTransactionsListMutation = (
  onClose: () => void,
  updateTransactionsState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation((file: File) => importTransactionsList(file), {
    onSuccess: (response) => {
      if (!response.data.error) {
        updateTransactionsState({
          type: ETransactionsActionType.openSuccessSnackbar,
          payload: true,
        });
        updateTransactionsState({
          type: ETransactionsActionType.resetTransactionFormData,
        });
        queryClient.invalidateQueries({ queryKey: ['transactionsList'] });

        setTimeout(() => {
          onClose();
        }, 1500);
      }
      return response.data.message;
    },
    onError: (error: any) => {
      console.error(error);
      if (error?.response?.data?.message) {
        updateTransactionsState({
          type: ETransactionsActionType.openErrorSnackbar,
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

export default useImportTransactionsListMutation;
