import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EState,
  ICaseApiResponseData,
  ICasesListApiResponse,
  ICasesQueryParams,
} from '../../../types/casesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToFirstRow } from './casesHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getCasesList = async (
  queryParams: ICasesQueryParams,
): Promise<IApiResponse<ICasesListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'asc',
    page = 1,
    size = 10,
    filter = 'active',
  } = queryParams;

  let response: IApiResponse<ICasesListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/cases-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
        filter: filter === EState.all ? '' : filter,
      },
      withCredentials: true,
    });

    if (response.data.data?.cases)
      response.data.data.cases = response.data.data.cases.map((item) =>
        mapApiResponseToFirstRow(item as ICaseApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetCasesListQuery = (queryParams: ICasesQueryParams) => {
  return useQuery(['casesList', queryParams], () => getCasesList(queryParams), {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetCasesListQuery;
