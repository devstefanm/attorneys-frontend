import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IApiResponse,
  IAutocompleteParams,
  ILongNamesApiResponse,
} from '../../../types/universalTypes';

const getLawyersNames = async (
  queryParams: IAutocompleteParams,
): Promise<IApiResponse<ILongNamesApiResponse[]>> => {
  let response: IApiResponse<ILongNamesApiResponse[]>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/lawyers-names',
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

const useGetLawyersNamesQuery = (queryParams: IAutocompleteParams) => {
  return useQuery(
    ['lawyersNames', queryParams],
    () => getLawyersNames(queryParams),
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

export default useGetLawyersNamesQuery;
