import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewExecutorApiResponseData } from '../../../types/executorsTypes';
import { mapExecutorApiResponseToEditExecutorForm } from '../../../features/executors/helpers/executorsHelpers';

const getExecutor = async (
  executorId: number,
): Promise<IApiResponse<IViewExecutorApiResponseData>> => {
  let response: IApiResponse<IViewExecutorApiResponseData>;
  if (executorId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/executor/${executorId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetExecutorQuery = (executorId: number) => {
  return useQuery(['executor', executorId], () => getExecutor(executorId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapExecutorApiResponseToEditExecutorForm(data.data.data);
      }
    },
  });
};

export default useGetExecutorQuery;
