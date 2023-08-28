import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  IApiResponse,
  IAutocompleteParams,
} from '../../../types/universalTypes';
import { ISSNumber } from '../../../types/ssnNumbersTypes';

const getSSNNumbers = async (
  queryParams: IAutocompleteParams,
): Promise<IApiResponse<ISSNumber[]>> => {
  let response: IApiResponse<ISSNumber[]>;

  try {
    response = await setupAxios({
      method: 'get',
      url: 'api/ssn-numbers',
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

const useGetSSNNumbersQuery = (queryParams: IAutocompleteParams) => {
  return useQuery(
    ['ssnNumbers', queryParams],
    () => getSSNNumbers(queryParams),
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

export default useGetSSNNumbersQuery;
