import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IClientsApiResponseData,
  IClientsListApiResponse,
  IClientsListQueryParams,
} from '../../../types/clientsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './clientsHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getClientsList = async (
  queryParams: IClientsListQueryParams,
): Promise<IApiResponse<IClientsListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'desc',
    page = 1,
    size = 25,
  } = queryParams;

  let response: IApiResponse<IClientsListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/clients-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.clients)
      response.data.data.clients = response.data.data.clients.map((item) =>
        mapApiResponseToTableData(item as IClientsApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetClientsListQuery = (queryParams: IClientsListQueryParams) => {
  return useQuery(
    ['clientsList', queryParams],
    () => getClientsList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetClientsListQuery;
