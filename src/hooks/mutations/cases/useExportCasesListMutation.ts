import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import {
  ECasesActionType,
  EState,
  ICasesFiltersData,
} from '../../../types/casesTypes';
import { useMutation } from '@tanstack/react-query';

const exportCasesList = async (
  casesFiltersData: ICasesFiltersData,
): Promise<Blob | string | undefined> => {
  const { filter = 'active', clientsFilter = 9999 } = casesFiltersData;

  let response: IApiResponse<{ type: string; data: number[] } | Blob | string>;

  response = await setupAxios({
    method: 'post',
    url: 'api/export-cases-list',
    data: {
      ...casesFiltersData,
      filter: filter === EState.all ? '' : filter,
      clientsFilter: clientsFilter === 9999 ? '' : clientsFilter,
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

const useExportCasesListMutation = (updateCasesState: React.Dispatch<any>) => {
  return useMutation(
    (casesFiltersData: ICasesFiltersData) => exportCasesList(casesFiltersData),
    {
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.data?.message) {
          updateCasesState({
            type: ECasesActionType.openErrorSnackbar,
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

export default useExportCasesListMutation;
