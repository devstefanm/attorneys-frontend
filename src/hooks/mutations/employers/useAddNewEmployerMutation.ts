import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EEmployersActionType,
  IEmployerRequestData,
} from '../../../types/employersTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewEmployer = async (
  employerRequestData: IEmployerRequestData,
): Promise<IApiResponse<IEmployerRequestData>> => {
  let response: IApiResponse<IEmployerRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/employers',
    data: employerRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewEmployerMutation = (
  onClose: () => void,
  updateEmployersState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (employerRequestData: IEmployerRequestData) =>
      addNewEmployer(employerRequestData),
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
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        updateEmployersState({
          type: EEmployersActionType.openErrorSnackbar,
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

export default useAddNewEmployerMutation;
