import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewSSNNumberApiResponseData } from '../../../types/ssnNumbersTypes';
import { mapSSNNumberApiResponseToEditSSNNumberForm } from '../../../features/ssnNumbers/helpers/ssnNumbersHelpers';

const getSSNNumber = async (
  ssnId: number,
): Promise<IApiResponse<IViewSSNNumberApiResponseData>> => {
  let response: IApiResponse<IViewSSNNumberApiResponseData>;
  if (ssnId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/ssn/${ssnId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetSSNNumberQuery = (ssnId: number) => {
  return useQuery(['ssnNumber', ssnId], () => getSSNNumber(ssnId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapSSNNumberApiResponseToEditSSNNumberForm(data.data.data);
      }
    },
  });
};

export default useGetSSNNumberQuery;
