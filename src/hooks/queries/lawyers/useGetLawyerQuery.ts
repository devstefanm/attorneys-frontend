import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewLawyerApiResponseData } from '../../../types/lawyersTypes';
import { mapLawyerApiResponseToEditLawyerForm } from '../../../features/lawyers/helpers/lawyersHelpers';

const getLawyer = async (
  lawyerId: number,
): Promise<IApiResponse<IViewLawyerApiResponseData>> => {
  let response: IApiResponse<IViewLawyerApiResponseData>;
  if (lawyerId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/lawyer/${lawyerId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetLawyerQuery = (lawyerId: number) => {
  return useQuery(['lawyer', lawyerId], () => getLawyer(lawyerId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapLawyerApiResponseToEditLawyerForm(data.data.data);
      }
    },
  });
};

export default useGetLawyerQuery;
