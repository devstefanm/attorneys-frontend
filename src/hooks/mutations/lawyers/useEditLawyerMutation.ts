import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ELawyersActionType,
  ILawyerRequestData,
} from '../../../types/lawyersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editLawyer = async (
  lawyerId: number,
  lawyerRequestData: ILawyerRequestData,
): Promise<IApiResponse<ILawyerRequestData>> => {
  let response: IApiResponse<ILawyerRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/lawyer/${lawyerId}`,
    data: lawyerRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditLawyerMutation = (
  onClose: () => void,
  updateLawyersState: React.Dispatch<any>,
  lawyerId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (lawyerRequestData: ILawyerRequestData) =>
      editLawyer(lawyerId, lawyerRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateLawyersState({ type: ELawyersActionType.resetLawyerFormData });
          updateLawyersState({
            type: ELawyersActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['lawyersList'] });
          queryClient.invalidateQueries({ queryKey: ['lawyer'] });
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
    },
  );
};

export default useEditLawyerMutation;
