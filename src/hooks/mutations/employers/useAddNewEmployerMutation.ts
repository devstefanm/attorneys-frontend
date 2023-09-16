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

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/employers',
      data: employerRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

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
          onClose();
          queryClient.invalidateQueries({ queryKey: ['employersList'] });
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewEmployerMutation;
