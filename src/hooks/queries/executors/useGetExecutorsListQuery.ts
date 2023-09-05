import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IExecutorsApiResponseData,
  IExecutorsListApiResponse,
  IExecutorsListQueryParams,
} from '../../../types/executorsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './executorsHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getExecutorsList = async (
  queryParams: IExecutorsListQueryParams,
): Promise<IApiResponse<IExecutorsListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'desc',
    page = 1,
    size = 25,
  } = queryParams;

  let response: IApiResponse<IExecutorsListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/executors-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.executors)
      response.data.data.executors = response.data.data.executors.map((item) =>
        mapApiResponseToTableData(item as IExecutorsApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetExecutorsListQuery = (queryParams: IExecutorsListQueryParams) => {
  return useQuery(
    ['executorsList', queryParams],
    () => getExecutorsList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetExecutorsListQuery;
