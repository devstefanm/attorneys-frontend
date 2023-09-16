import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewCaseApiResponseData } from '../../../types/casesTypes';
import { mapCaseApiResponseToEditCaseForm } from '../../../features/cases/helpers/casesHelpers';

const getCaseNumbersWithNames = async (
  caseId: number,
): Promise<IApiResponse<IViewCaseApiResponseData>> => {
  let response: IApiResponse<IViewCaseApiResponseData>;

  try {
    response = await setupAxios({
      method: 'get',
      url: `api/case/${caseId}`,
      withCredentials: true,
    });
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useGetCaseByCaseIdQuery = (caseId: number) => {
  return useQuery(['case', caseId], () => getCaseNumbersWithNames(caseId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapCaseApiResponseToEditCaseForm(data.data.data);
      }
    },
  });
};

export default useGetCaseByCaseIdQuery;
