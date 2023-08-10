import { NavigateFunction } from 'react-router-dom';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { ILoginApiResponseData, ILoginRequest } from '../../../types/authTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';

const login = async (
  loginCredentials: ILoginRequest,
): Promise<IApiResponse<ILoginApiResponseData>> => {
  let response: IApiResponse<ILoginApiResponseData>;

  try {
    response = await setupAxios({
      method: 'post',
      url: 'auth/login',
      data: loginCredentials,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useLoginMutation = (navigate: NavigateFunction) => {
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
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useLoginMutation;
