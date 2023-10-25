import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';
import {
  ETransactionTypeFilter,
  ETransactionsActionType,
  ITransactionsFiltersData,
} from '../../../types/transactionsTypes';

const exportTransactionsList = async (
  transactionsFiltersData: ITransactionsFiltersData,
): Promise<Blob | string | undefined> => {
  const { filter = 'active' } = transactionsFiltersData;

  let response: IApiResponse<{ type: string; data: number[] } | Blob | string>;

  response = await setupAxios({
    method: 'post',
    url: 'api/export-transactions-list',
    data: {
      ...transactionsFiltersData,
      filter: filter === ETransactionTypeFilter.all ? '' : filter,
    },
    withCredentials: true,
  });

  if (!response.data.error) {
    const responseData = response.data.data;
    if (responseData) {
      if (
        typeof responseData === 'object' &&
        responseData.type === 'Buffer' &&
        Array.isArray(responseData.data)
      ) {
        const uint8Array = new Uint8Array(responseData.data);

        return new Blob([uint8Array]);
      } else {
        return new Blob([responseData as string]);
      }
    }
  }
};

const useExportTransactionsListMutation = (
  updateTransactionsState: React.Dispatch<any>,
) => {
  return useMutation(
    (transactionsFiltersData: ITransactionsFiltersData) =>
      exportTransactionsList(transactionsFiltersData),
    {
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

export default useExportTransactionsListMutation;
