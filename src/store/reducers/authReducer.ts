import { EAuthFormType, ILoginCredentials } from '../../types/authTypes';

export interface IAuthState {
  authFormType: EAuthFormType;
  loginCredentials: ILoginCredentials;
  showPassword: boolean;
}

export enum EAuthActionType {
  switch_auth_form_type = 'SWITCH AUTH FORM TYPE',
  login_user = 'LOGIN USER',
  show_password = 'SHOW PASSWORD',
}

interface IAuthAction {
  type: EAuthActionType;
  payload?: EAuthFormType | ILoginCredentials | boolean;
}

const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case EAuthActionType.login_user:
      return {
        ...state,
        loginCredentials: action.payload as ILoginCredentials,
      };
    case EAuthActionType.switch_auth_form_type:
      return { ...state, authFormType: action.payload as EAuthFormType };
    case EAuthActionType.show_password:
      return { ...state, showPassword: action.payload as boolean };
    default:
      return state;
  }
};

export { authReducer };
