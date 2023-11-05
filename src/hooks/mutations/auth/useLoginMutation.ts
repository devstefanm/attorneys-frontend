import { NavigateFunction } from 'react-router-dom';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { ILoginApiResponseData, ILoginRequest } from '../../../types/authTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';
import { EAuthActionType } from '../../../store/reducers/authReducer';

const login = async (
  loginCredentials: ILoginRequest,
): Promise<IApiResponse<ILoginApiResponseData>> => {
  let response: IApiResponse<ILoginApiResponseData>;

  response = await setupAxios({
    method: 'post',
    url: 'auth/login',
    data: loginCredentials,
  });

  return response;
};

const useLoginMutation = (
  navigate: NavigateFunction,
  updateLoginState: React.Dispatch<any>,
) => {
  return useMutation(
    (loginCredentials: ILoginRequest) => login(loginCredentials),
    {
      onSuccess: (response) => {
        localStorage.setItem(
          import.meta.env.VITE_APP_TOKEN_NAME,
          response.data.data?.accessToken as string,
        );
        navigate('/cases');
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.data?.message) {
          updateLoginState({
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

export default useLoginMutation;
