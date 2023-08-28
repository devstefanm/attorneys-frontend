import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IApiResponse,
  IAutocompleteParams,
  IShortNamesApiResponse,
} from '../../../types/universalTypes';

const getCitiesNames = async (
  queryParams: IAutocompleteParams,
): Promise<IApiResponse<IShortNamesApiResponse[]>> => {
  let response: IApiResponse<IShortNamesApiResponse[]>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/cities-names',
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

const useGetCitiesNamesQuery = (queryParams: IAutocompleteParams) => {
  return useQuery(
    ['citiesNames', queryParams],
    () => getCitiesNames(queryParams),
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

export default useGetCitiesNamesQuery;
