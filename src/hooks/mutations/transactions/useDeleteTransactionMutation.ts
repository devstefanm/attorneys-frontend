import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ETransactionsActionType,
  ITransactionRequestData,
} from '../../../types/transactionsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteTransaction = async (
  transactionId: number,
): Promise<IApiResponse<ITransactionRequestData>> => {
  let response: IApiResponse<ITransactionRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/transaction/${transactionId}`,
    withCredentials: true,
  });

  return response;
};

const useDeleteTransactionMutation = (
  onClose: () => void,
  updateTransactionsState: React.Dispatch<any>,
  transactionId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTransaction(transactionId), {
    onSuccess: (response) => {
      console.log('response', response.data);
      if (!response.data.error) {
        updateTransactionsState({
          type: ETransactionsActionType.resetTransactionFormData,
        });
        updateTransactionsState({
          type: ETransactionsActionType.openSuccessSnackbar,
          payload: true,
        });
        onClose();
        queryClient.invalidateQueries({ queryKey: ['transactionsList'] });
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

export default useDeleteTransactionMutation;
