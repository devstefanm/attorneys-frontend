import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewCityApiResponseData } from '../../../types/citiesTypes';
import { mapCityApiResponseToEditCityForm } from '../../../features/cities/helpers/citiesHelpers';

const getCity = async (
  cityId: number,
): Promise<IApiResponse<IViewCityApiResponseData>> => {
  let response: IApiResponse<IViewCityApiResponseData>;
  if (cityId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/city/${cityId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetCityQuery = (cityId: number) => {
  return useQuery(['city', cityId], () => getCity(cityId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapCityApiResponseToEditCityForm(data.data.data);
      }
    },
  });
};

export default useGetCityQuery;
