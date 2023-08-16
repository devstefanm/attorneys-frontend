import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ICourtsApiResponseData,
  ICourtsListApiResponse,
  ICourtsListQueryParams,
} from '../../../types/courtsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './courtsHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getCourtsList = async (
  queryParams: ICourtsListQueryParams,
): Promise<IApiResponse<ICourtsListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'asc',
    page = 1,
    size = 10,
  } = queryParams;

  let response: IApiResponse<ICourtsListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/courts-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.courts)
      response.data.data.courts = response.data.data.courts.map((item) =>
        mapApiResponseToTableData(item as ICourtsApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetCourtsListQuery = (queryParams: ICourtsListQueryParams) => {
  return useQuery(
    ['courtsList', queryParams],
    () => getCourtsList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetCourtsListQuery;
