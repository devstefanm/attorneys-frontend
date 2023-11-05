export interface ILoginCredentials {
  email: string;
  password: string;
}

export enum EAuthFormType {
  login = 'LOGIN',
}

export interface ILoginApiResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  identifier: string;
  password: string;
}

export interface IChangePasswordCredentials {
  newPassword: string;
  newRepeatedPassword: string;
}
