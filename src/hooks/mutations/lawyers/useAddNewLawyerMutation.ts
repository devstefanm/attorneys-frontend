import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ELawyersActionType,
  ILawyerRequestData,
} from '../../../types/lawyersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewLawyer = async (
  lawyerRequestData: ILawyerRequestData,
): Promise<IApiResponse<ILawyerRequestData>> => {
  let response: IApiResponse<ILawyerRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/lawyers',
    data: lawyerRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewLawyerMutation = (
  onClose: () => void,
  updateLawyersState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (lawyerRequestData: ILawyerRequestData) => addNewLawyer(lawyerRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateLawyersState({
            type: ELawyersActionType.resetLawyerFormData,
          });
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
        updateLawyersState({
          type: ELawyersActionType.openErrorSnackbar,
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

export default useAddNewLawyerMutation;
