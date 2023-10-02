import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ETransactionsActionType,
  ITransactionRequestData,
} from '../../../types/transactionsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewTransaction = async (
  transactionRequestData: ITransactionRequestData,
): Promise<IApiResponse<ITransactionRequestData>> => {
  let response: IApiResponse<ITransactionRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/transactions',
    data: transactionRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewTransactionMutation = (
  onClose: () => void,
  updateTransactionsState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (transactionRequestData: ITransactionRequestData) =>
      addNewTransaction(transactionRequestData),
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
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        updateTransactionsState({
          type: ETransactionsActionType.openErrorSnackbar,
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

export default useAddNewTransactionMutation;
