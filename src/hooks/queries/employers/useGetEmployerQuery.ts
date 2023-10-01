import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewEmployerApiResponseData } from '../../../types/employersTypes';
import { mapEmployerApiResponseToEditEmployerForm } from '../../../features/employers/helpers/employersHelpers';

const getEmployer = async (
  employerId: number,
): Promise<IApiResponse<IViewEmployerApiResponseData>> => {
  let response: IApiResponse<IViewEmployerApiResponseData>;
  if (employerId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/employer/${employerId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetEmployerQuery = (employerId: number) => {
  return useQuery(['employer', employerId], () => getEmployer(employerId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapEmployerApiResponseToEditEmployerForm(data.data.data);
      }
    },
  });
};

export default useGetEmployerQuery;
