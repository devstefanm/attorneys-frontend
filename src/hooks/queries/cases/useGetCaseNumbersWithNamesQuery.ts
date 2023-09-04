import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IApiResponse,
  IAutocompleteParams,
  IShortNamesApiResponse,
} from '../../../types/universalTypes';

const getCaseNumbersWithNames = async (
  queryParams: IAutocompleteParams,
): Promise<IApiResponse<IShortNamesApiResponse[]>> => {
  let response: IApiResponse<IShortNamesApiResponse[]>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/filter-case-numbers',
      params: {
        ...queryParams,
      },
      withCredentials: true,
    });
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetCaseNumbersWithNamesQuery = (queryParams: IAutocompleteParams) => {
  return useQuery(
    ['caseNumbersWithNames', queryParams],
    () => getCaseNumbersWithNames(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select(data) {
        return data.data.data;
      },
    },
  );
};

export default useGetCaseNumbersWithNamesQuery;
