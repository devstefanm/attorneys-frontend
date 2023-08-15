import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IPackagesApiResponseData,
  IPackagesListApiResponse,
  IPackagesListQueryParams,
} from '../../../types/packagesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { mapApiResponseToTableData } from './packagesHelpers';
import { camelToSnake } from '../../../utils/transformData';

const getPackagesList = async (
  queryParams: IPackagesListQueryParams,
): Promise<IApiResponse<IPackagesListApiResponse>> => {
  const {
    sortBy = 'created_at',
    sort = 'asc',
    page = 1,
    size = 10,
  } = queryParams;

  let response: IApiResponse<IPackagesListApiResponse>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/packages-list',
      params: {
        ...queryParams,
        sortBy: sortBy === '' ? 'created_at' : camelToSnake(sortBy),
        sort: sort === '' ? 'asc' : sort,
        page,
        size,
      },
      withCredentials: true,
    });

    if (response.data.data?.packages)
      response.data.data.packages = response.data.data.packages.map((item) =>
        mapApiResponseToTableData(item as IPackagesApiResponseData),
      );
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetPackagesListQuery = (queryParams: IPackagesListQueryParams) => {
  return useQuery(
    ['packagesList', queryParams],
    () => getPackagesList(queryParams),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetPackagesListQuery;
