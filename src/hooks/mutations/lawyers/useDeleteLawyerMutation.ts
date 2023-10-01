import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ELawyersActionType,
  ILawyerRequestData,
} from '../../../types/lawyersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteLawyer = async (
  lawyerId: number,
): Promise<IApiResponse<ILawyerRequestData>> => {
  let response: IApiResponse<ILawyerRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/lawyer/${lawyerId}`,
    withCredentials: true,
  });

  return response;
};

const useDeleteLawyerMutation = (
  onClose: () => void,
  updateLawyersState: React.Dispatch<any>,
  lawyerId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteLawyer(lawyerId), {
    onSuccess: (response) => {
      if (!response.data.error) {
        updateLawyersState({ type: ELawyersActionType.resetLawyerFormData });
        updateLawyersState({
          type: ELawyersActionType.openSuccessSnackbar,
          payload: true,
        });
        onClose();
        queryClient.invalidateQueries({ queryKey: ['lawyersList'] });
      }
      return response.data.message;
    },
    onError: (error: any) => {
      console.error(error);
      if (error?.response?.data?.message) {
        updateLawyersState({
          type: ELawyersActionType.openErrorSnackbar,
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

export default useDeleteLawyerMutation;
