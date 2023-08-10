import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ITransactionsApiResponseData,
  ITransactionsListApiResponse,
  ITransactionsListQueryParams,
} from '../../../types/transactionsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './transactionsHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getTransactionsList = async (
  queryParams: ITransactionsListQueryParams,
): Promise<IApiResponse<ITransactionsListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'asc',
    page = 1,
    size = 10,
  } = queryParams;

  let response: IApiResponse<ITransactionsListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/transactions-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.transactions)
      response.data.data.transactions = response.data.data.transactions.map(
        (item) =>
          mapApiResponseToTableData(item as ITransactionsApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetTransactionsListQuery = (
  queryParams: ITransactionsListQueryParams,
) => {
  return useQuery(
    ['transactionsList', queryParams],
    () => getTransactionsList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetTransactionsListQuery;
