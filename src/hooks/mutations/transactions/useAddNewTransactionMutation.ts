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

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/transactions',
      data: transactionRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

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
          onClose();
          queryClient.invalidateQueries({ queryKey: ['transactionsList'] });
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewTransactionMutation;
