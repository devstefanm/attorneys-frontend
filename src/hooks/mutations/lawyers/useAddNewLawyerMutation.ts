import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ELawyersActionType,
  ILawyerRequestData,
} from '../../../types/lawyersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';

const addNewLawyer = async (
  lawyerRequestData: ILawyerRequestData,
): Promise<IApiResponse<ILawyerRequestData>> => {
  let response: IApiResponse<ILawyerRequestData>;

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/lawyers',
      data: lawyerRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useAddNewLawyerMutation = (
  onClose: () => void,
  updateLawyersState: React.Dispatch<any>,
) => {
  return useMutation(
    (lawyerRequestData: ILawyerRequestData) => addNewLawyer(lawyerRequestData),
    {
      onSuccess: (response) => {
        updateLawyersState({
          type: ELawyersActionType.resetLawyerFormData,
        });
        if (!response.data.error) {
          onClose();
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewLawyerMutation;