import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EClientsActionType,
  IClientRequestData,
} from '../../../types/clientsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteClient = async (
  clientId: number,
): Promise<IApiResponse<IClientRequestData>> => {
  let response: IApiResponse<IClientRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/client/${clientId}`,
    withCredentials: true,
  });

  return response;
};

const useDeleteClientMutation = (
  onClose: () => void,
  updateClientsState: React.Dispatch<any>,
  clientId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteClient(clientId), {
    onSuccess: (response) => {
      if (!response.data.error) {
        updateClientsState({ type: EClientsActionType.resetClientFormData });
        updateClientsState({
          type: EClientsActionType.openSuccessSnackbar,
          payload: true,
        });
        onClose();
        queryClient.invalidateQueries({ queryKey: ['clientsList'] });
      }
      return response.data.message;
    },
    onError: (error: any) => {
      console.error(error);
      if (error?.response?.data?.message) {
        updateClientsState({
          type: EClientsActionType.openErrorSnackbar,
          payload: true,
        });
      }
      return {
        error,
        message: error?.response?.data?.message || 'Error has occured',
      };
    },
  });
};

export default useDeleteClientMutation;
