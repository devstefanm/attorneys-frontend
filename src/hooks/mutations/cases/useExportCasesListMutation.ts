import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { EState, ICasesFiltersData } from '../../../types/casesTypes';
import { useMutation } from '@tanstack/react-query';

const exportCasesList = async (
  casesFiltersData: ICasesFiltersData,
): Promise<Blob | string | undefined> => {
  const { filter = 'active', clientsFilter = 9999 } = casesFiltersData;

  let response: IApiResponse<{ type: string; data: number[] } | Blob | string>;

  try {
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
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

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

const useExportCasesListMutation = () => {
  return useMutation(
    (casesFiltersData: ICasesFiltersData) => exportCasesList(casesFiltersData),
    {
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useExportCasesListMutation;
