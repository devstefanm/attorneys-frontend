import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IApiResponse,
  IAutocompleteParams,
  IShortNamesApiResponse,
} from '../../../types/universalTypes';

const getEmployersNames = async (
  queryParams: IAutocompleteParams,
): Promise<IApiResponse<IShortNamesApiResponse[]>> => {
  let response: IApiResponse<IShortNamesApiResponse[]>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/employers-names',
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

const useGetEmployersNamesQuery = (queryParams: IAutocompleteParams) => {
  return useQuery(
    ['employersNames', queryParams],
    () => getEmployersNames(queryParams),
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

export default useGetEmployersNamesQuery;
