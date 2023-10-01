import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewClientApiResponseData } from '../../../types/clientsTypes';
import { mapClientApiResponseToEditClientForm } from '../../../features/clients/helpers/clientsHelpers';

const getClient = async (
  clientId: number,
): Promise<IApiResponse<IViewClientApiResponseData>> => {
  let response: IApiResponse<IViewClientApiResponseData>;
  if (clientId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/client/${clientId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetClientQuery = (clientId: number) => {
  return useQuery(['client', clientId], () => getClient(clientId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapClientApiResponseToEditClientForm(data.data.data);
      }
    },
  });
};

export default useGetClientQuery;
