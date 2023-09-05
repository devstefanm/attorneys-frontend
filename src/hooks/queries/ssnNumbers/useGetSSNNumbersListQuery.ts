import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ISSNNumbersApiResponseData,
  ISSNNumbersListApiResponse,
  ISSNNumbersListQueryParams,
} from '../../../types/ssnNumbersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './ssnNumbersHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getSSNNumbersList = async (
  queryParams: ISSNNumbersListQueryParams,
): Promise<IApiResponse<ISSNNumbersListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'desc',
    page = 1,
    size = 25,
  } = queryParams;

  let response: IApiResponse<ISSNNumbersListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/ssn-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.ssn_numbers)
      response.data.data.ssn_numbers = response.data.data.ssn_numbers.map(
        (item) => mapApiResponseToTableData(item as ISSNNumbersApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetSSNNumbersListQuery = (queryParams: ISSNNumbersListQueryParams) => {
  return useQuery(
    ['ssnNumbersList', queryParams],
    () => getSSNNumbersList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetSSNNumbersListQuery;
