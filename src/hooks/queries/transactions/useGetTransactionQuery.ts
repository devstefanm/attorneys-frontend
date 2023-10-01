import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewTransactionApiResponseData } from '../../../types/transactionsTypes';
import { mapTransactionApiResponseToEditTransactionForm } from '../../../features/transactions/helpers/transactionsHelpers';

const getTransaction = async (
  transactionId: number,
): Promise<IApiResponse<IViewTransactionApiResponseData>> => {
  let response: IApiResponse<IViewTransactionApiResponseData>;
  if (transactionId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/transaction/${transactionId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetTransactionQuery = (transactionId: number) => {
  return useQuery(
    ['transaction', transactionId],
    () => getTransaction(transactionId),
    {
      keepPreviousData: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      select(data) {
        if (data.data.data) {
          return mapTransactionApiResponseToEditTransactionForm(data.data.data);
        }
      },
    },
  );
};

export default useGetTransactionQuery;
