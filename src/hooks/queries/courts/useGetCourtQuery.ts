import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewCourtApiResponseData } from '../../../types/courtsTypes';
import { mapCourtApiResponseToEditCourtForm } from '../../../features/courts/helpers/courtsHelpers';

const getCourt = async (
  courtId: number,
): Promise<IApiResponse<IViewCourtApiResponseData>> => {
  let response: IApiResponse<IViewCourtApiResponseData>;
  if (courtId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/court/${courtId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetCourtQuery = (courtId: number) => {
  return useQuery(['court', courtId], () => getCourt(courtId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapCourtApiResponseToEditCourtForm(data.data.data);
      }
    },
  });
};

export default useGetCourtQuery;
