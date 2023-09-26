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

  response = await setupAxios({
    method: 'post',
    url: 'api/clients',
    data: clientRequestData,
    withCredentials: true,
  });

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
        updateClientsState({
          type: EClientsActionType.openErrorSnackbar,
          payload: true,
        });
        return {
          error,
          message: error?.response?.data?.message || 'Error has occured',
        };
      },
    },
  );
};

export default useAddNewClientMutation;
