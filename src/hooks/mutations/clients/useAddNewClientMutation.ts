import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EClientsActionType,
  IClientRequestData,
} from '../../../types/clientsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewClient = async (
  clientRequestData: IClientRequestData,
): Promise<IApiResponse<IClientRequestData>> => {
  let response: IApiResponse<IClientRequestData>;

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/clients',
      data: clientRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useAddNewClientMutation = (
  onClose: () => void,
  updateClientsState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (clientRequestData: IClientRequestData) => addNewClient(clientRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateClientsState({
            type: EClientsActionType.resetClientFormData,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['clientsList'] });
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewClientMutation;
