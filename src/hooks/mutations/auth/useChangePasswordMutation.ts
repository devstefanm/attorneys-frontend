import { setupAxios } from '../../../libs/axios/setupAxios';
import { EAuthActionType } from '../../../store/reducers/authReducer';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';

const changePassword = async (
  caseId: number | null,
  newPassword: string,
): Promise<IApiResponse<any>> => {
  let response: IApiResponse<any>;

  response = await setupAxios({
    method: 'put',
    url: `auth/change-password/${caseId}`,
    data: { newPassword },
    withCredentials: true,
  });

  return response;
};

const useChangePasswordMutation = (
  caseId: number | null,
  updateChangePasswordState: React.Dispatch<any>,
) => {
  return useMutation(
    (newPassword: string) => changePassword(caseId, newPassword),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateChangePasswordState({
            type: EAuthActionType.openSuccessSnackbar,
            payload: true,
          });
          updateChangePasswordState({
            type: EAuthActionType.reset_password_credentials,
          });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.data?.message) {
          updateChangePasswordState({
            type: EAuthActionType.openErrorSnackbar,
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

export default useChangePasswordMutation;
