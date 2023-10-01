import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EEmployersActionType,
  IEmployerRequestData,
} from '../../../types/employersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editEmployer = async (
  employerId: number,
  employerRequestData: IEmployerRequestData,
): Promise<IApiResponse<IEmployerRequestData>> => {
  let response: IApiResponse<IEmployerRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/employer/${employerId}`,
    data: employerRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditEmployerMutation = (
  onClose: () => void,
  updateEmployersState: React.Dispatch<any>,
  employerId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (employerRequestData: IEmployerRequestData) =>
      editEmployer(employerId, employerRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateEmployersState({
            type: EEmployersActionType.resetEmployerFormData,
          });
          updateEmployersState({
            type: EEmployersActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['employersList'] });
          queryClient.invalidateQueries({ queryKey: ['employer'] });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.data?.message) {
          updateEmployersState({
            type: EEmployersActionType.openErrorSnackbar,
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

export default useEditEmployerMutation;
