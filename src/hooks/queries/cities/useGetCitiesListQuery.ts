import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ICitiesApiResponseData,
  ICitiesListApiResponse,
  ICitiesListQueryParams,
} from '../../../types/citiesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './citiesHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getCitiesList = async (
  queryParams: ICitiesListQueryParams,
): Promise<IApiResponse<ICitiesListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'desc',
    page = 1,
    size = 25,
  } = queryParams;

  let response: IApiResponse<ICitiesListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/cities-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.cities)
      response.data.data.cities = response.data.data.cities.map((item) =>
        mapApiResponseToTableData(item as ICitiesApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetCitiesListQuery = (queryParams: ICitiesListQueryParams) => {
  return useQuery(
    ['citiesList', queryParams],
    () => getCitiesList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetCitiesListQuery;
