import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ETransactionsActionType,
  ITransactionRequestData,
} from '../../../types/transactionsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editTransaction = async (
  transactionId: number,
  transactionRequestData: ITransactionRequestData,
): Promise<IApiResponse<ITransactionRequestData>> => {
  let response: IApiResponse<ITransactionRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/transaction/${transactionId}`,
    data: transactionRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditTransactionMutation = (
  onClose: () => void,
  updateTransactionsState: React.Dispatch<any>,
  transactionId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (transactionRequestData: ITransactionRequestData) =>
      editTransaction(transactionId, transactionRequestData),
    {
      onSuccess: (response) => {
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
          queryClient.invalidateQueries({ queryKey: ['transaction'] });
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
    },
  );
};

export default useEditTransactionMutation;
