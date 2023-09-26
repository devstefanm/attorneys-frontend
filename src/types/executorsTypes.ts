import {
  IAutocompleteOption,
  IMetaApiResponseData,
  IMetaQueryParams,
} from './universalTypes';

export enum EExecutorsActionType {
  addExecutorModalOpen = 'ADD_EXECUTOR_MODAL_OPEN',
  addExecutorForm = 'ADD_EXECUTOR_FORM',
  addExecutorAutocompleteValues = 'ADD_EXECUTOR_AC_VALUES',
  resetExecutorFormData = 'RESET_EXECUTOR_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
}

export type ExecutorsTableName =
  | 'name'
  | 'email'
  | 'city'
  | 'phoneNumbers'
  | 'displayPhoneNumbers'
  | 'numberOfCases';

export type ExecutorsTableHeader =
  | 'Name'
  | 'Email'
  | 'City'
  | 'Phone Numbers'
  | 'Number of Cases';

export interface IExecutorsTableData {
  name: string;
  city: string;
  email: string;
  phoneNumbers: string;
  displayPhoneNumbers: string;
  numberOfCases: string;
}

export interface IExecutorsApiResponseData {
  first_name: string;
  last_name: string;
  city: string;
  email: string;
  phone_numbers: string;
  display_phone_numbers: string;
  case_count: string;
}

export interface IExecutorsTableHeader {
  [key: string]: ExecutorsTableName;
}

export interface IExecutorsListQueryParams extends IMetaQueryParams {
  name?: string;
}

export interface IExecutorsListApiResponse {
  executors: IExecutorsApiResponseData[] | IExecutorsTableData[];
  meta: IMetaApiResponseData;
}

export interface IAddExecutorForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumbers: string[];
  city: IAutocompleteOption<string> | string;
}

export interface IAddExecutorAutocompleteValues {
  city: string;
}

export interface IExecutorResponseObject {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_numbers: string[];
  city: IAutocompleteOption<string> | string;
  name: string;
}

export interface IExecutorRequestData {
  first_name: string;
  last_name: string;
  email: string;
  phone_numbers: string[];
  city_id: number | null;
}
