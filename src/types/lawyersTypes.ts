import {
  IAutocompleteOption,
  IMetaApiResponseData,
  IMetaQueryParams,
} from './universalTypes';

export enum ELawyersActionType {
  addLawyerModalOpen = 'ADD_LAWYER_MODAL_OPEN',
  editLawyerModalOpen = 'EDIT_LAWYER_MODAL_OPEN',
  addLawyerForm = 'ADD_LAWYER_FORM',
  addLawyerAutocompleteValues = 'ADD_LAWYER_AC_VALUES',
  resetLawyerFormData = 'RESET_LAWYER_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
  setLawyerFormData = 'SET_LAWYER_FORM_DATA',
  editLawyerAutocompleteValues = 'EDIT_LAWYER_AC_VALUES',
  editLawyerForm = 'EDIT_LAWYER_FORM',
  editLawyerId = 'EDIT_LAWYER_ID',
  confirmationDialogOpen = 'DIALOG_OPEN',
}

export type LawyersTableName =
  | 'name'
  | 'officeName'
  | 'email'
  | 'address'
  | 'city'
  | 'phoneNumbers'
  | 'displayPhoneNumbers'
  | 'numberOfCases';

export type LawyersTableHeader =
  | 'Name'
  | 'Office Name'
  | 'Email'
  | 'Address'
  | 'City'
  | 'Phone Numbers'
  | 'Number of Cases';

export interface ILawyersTableData {
  id: number;
  name: string;
  officeName: string;
  email: string;
  address: string;
  city: string;
  phoneNumbers: string;
  displayPhoneNumbers: string;
  numberOfCases: string;
}

export interface ILawyersApiResponseData {
  id: number;
  first_name: string;
  last_name: string;
  office_name: string;
  email: string;
  address: string;
  city: string;
  phone_numbers: string;
  display_phone_numbers: string;
  case_count: string;
}

export interface ILawyersTableHeader {
  [key: string]: LawyersTableName;
}

export interface ILawyersListQueryParams extends IMetaQueryParams {
  name?: string;
  office_name?: string;
  email?: string;
}

export interface ILawyersListApiResponse {
  lawyers: ILawyersApiResponseData[] | ILawyersTableData[];
  meta: IMetaApiResponseData;
}

export interface IAddLawyerForm {
  firstName: string;
  lastName: string;
  officeName: string;
  address: string;
  email: string;
  phoneNumbers: string[];
  city: IAutocompleteOption<string> | string;
}

export interface IAddLawyerAutocompleteValues {
  city: string;
}

export interface ILawyerResponseObject {
  id: number | null;
  first_name: string;
  last_name: string;
  office_name: string;
  address: string;
  email: string;
  phone_numbers: string[];
  city: IAutocompleteOption<string> | string;
  name: string;
}

export interface ILawyerRequestData {
  office_name?: string | null;
  address?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone_numbers?: string[];
  city_id?: number | string | null;
}

export interface IEditLawyerForm extends IAddLawyerForm {}

export interface IEditedLawyerFormData {
  firstName?: string;
  lastName?: string;
  officeName?: string;
  address?: string;
  email?: string;
  phoneNumbers?: string[];
  city?: IAutocompleteOption<string> | string;
}

export interface IViewLawyerApiResponseData {
  id: number;
  office_name: string;
  first_name: string;
  last_name: string;
  email: string | null;
  address: string | null;
  city: {
    id: number;
    name: string;
  };
  phone_numbers: string[];
}
