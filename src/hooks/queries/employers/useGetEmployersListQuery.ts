import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IEmployersApiResponseData,
  IEmployersListApiResponse,
  IEmployersListQueryParams,
} from '../../../types/employersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './employersHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getEmployersList = async (
  queryParams: IEmployersListQueryParams,
): Promise<IApiResponse<IEmployersListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'desc',
    page = 1,
    size = 25,
  } = queryParams;

  let response: IApiResponse<IEmployersListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/employers-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.employers)
      response.data.data.employers = response.data.data.employers.map((item) =>
        mapApiResponseToTableData(item as IEmployersApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetEmployersListQuery = (queryParams: IEmployersListQueryParams) => {
  return useQuery(
    ['employersList', queryParams],
    () => getEmployersList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetEmployersListQuery;
