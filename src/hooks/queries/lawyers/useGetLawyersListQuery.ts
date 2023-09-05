import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ILawyersApiResponseData,
  ILawyersListApiResponse,
  ILawyersListQueryParams,
} from '../../../types/lawyersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './lawyersHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getLawyersList = async (
  queryParams: ILawyersListQueryParams,
): Promise<IApiResponse<ILawyersListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'desc',
    page = 1,
    size = 25,
  } = queryParams;

  let response: IApiResponse<ILawyersListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/lawyers-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.lawyers)
      response.data.data.lawyers = response.data.data.lawyers.map((item) =>
        mapApiResponseToTableData(item as ILawyersApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetLawyersListQuery = (queryParams: ILawyersListQueryParams) => {
  return useQuery(
    ['lawyersList', queryParams],
    () => getLawyersList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetLawyersListQuery;
