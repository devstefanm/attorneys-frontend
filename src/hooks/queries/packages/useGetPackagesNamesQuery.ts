import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IApiResponse,
  IAutocompleteParams,
} from '../../../types/universalTypes';
import { IPackageName } from '../../../types/packagesTypes';

const getPackagesNames = async (
  queryParams: IAutocompleteParams,
): Promise<IApiResponse<IPackageName[]>> => {
  let response: IApiResponse<IPackageName[]>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/packages-names',
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

const useGetPackagesNamesQuery = (queryParams: IAutocompleteParams) => {
  return useQuery(
    ['packagesNames', queryParams],
    () => getPackagesNames(queryParams),
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

export default useGetPackagesNamesQuery;
