import {
  EAuthFormType,
  IChangePasswordCredentials,
  ILoginCredentials,
} from '../../types/authTypes';

export interface IAuthState {
  authFormType: EAuthFormType;
  loginCredentials: ILoginCredentials;
  showPassword: boolean;
  showNewPassword: boolean;
  showNewRepeatedPassword: boolean;
  changePasswordCredentials: IChangePasswordCredentials;
  openSuccessSnackbar: boolean;
  openErrorSnackbar: boolean;
}

export enum EAuthActionType {
  switch_auth_form_type = 'SWITCH AUTH FORM TYPE',
  login_user = 'LOGIN USER',
  show_password = 'SHOW PASSWORD',
  show_new_password = 'SHOW NEW PASSWORD',
  show_new_repeated_password = 'SHOW NEW REPEATED PASSWORD',
  change_password_credentials = 'CHANGE PASSWORD CREDENTIALS',
  reset_password_credentials = 'RESET PASSWORD CREDENTIALS',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
}

interface IAuthAction {
  type: EAuthActionType;
  payload?:
    | EAuthFormType
    | ILoginCredentials
    | IChangePasswordCredentials
    | boolean;
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
    case EAuthActionType.show_new_password:
      return { ...state, showNewPassword: action.payload as boolean };
    case EAuthActionType.show_new_repeated_password:
      return { ...state, showNewRepeatedPassword: action.payload as boolean };
    case EAuthActionType.openErrorSnackbar:
      return { ...state, openErrorSnackbar: action.payload as boolean };
    case EAuthActionType.openSuccessSnackbar:
      return { ...state, openSuccessSnackbar: action.payload as boolean };
    case EAuthActionType.change_password_credentials:
      return {
        ...state,
        changePasswordCredentials: action.payload as IChangePasswordCredentials,
      };
    case EAuthActionType.reset_password_credentials:
      return {
        ...state,
        changePasswordCredentials: {
          newPassword: '',
          newRepeatedPassword: '',
        },
      };
    default:
      return state;
  }
};

export { authReducer };
