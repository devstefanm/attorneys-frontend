import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum ESSNNumbersActionType {
  addSSNNumberModalOpen = 'ADD_SSN_NUMBER_MODAL_OPEN',
  addSSNNumberForm = 'ADD_SSN_NUMBER_FORM',
  addSSNNumberAutocompleteValues = 'ADD_SSN_NUMBER_AC_VALUES',
  resetSSNNumberFormData = 'RESET_SSN_NUMBER_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
}

export type SSNNumbersTableName = 'ssn' | 'numberOfCases';

export type SSNNumbersTableHeader = 'SSN Number' | 'Number of Cases';

export interface ISSNNumbersTableData {
  ssn: string;
  numberOfCases: string;
}

export interface ISSNNumbersApiResponseData {
  ssn: string;
  case_count: string;
}

export interface ISSNNumbersTableHeader {
  [key: string]: SSNNumbersTableName;
}

export interface ISSNNumbersListQueryParams extends IMetaQueryParams {
  ssn?: string;
}

export interface ISSNNumbersListApiResponse {
  ssn_numbers: ISSNNumbersApiResponseData[] | ISSNNumbersTableData[];
  meta: IMetaApiResponseData;
}

export interface ISSNumber {
  id: number;
  ssn: string;
}

export interface IAddSSNNumberForm {
  ssnNumber: string;
}

export interface ISSNNumberResponseObject {
  id: number | null;
  ssn: string;
}

export interface ISSNNumberRequestData {
  ssn: string;
}
