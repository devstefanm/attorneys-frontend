import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum EEmployersActionType {
  addEmployerModalOpen = 'ADD_EMPLOYER_MODAL_OPEN',
  editEmployerModalOpen = 'EDIT_EMPLOYER_MODAL_OPEN',
  addEmployerForm = 'ADD_EMPLOYER_FORM',
  addEmployerAutocompleteValues = 'ADD_EMPLOYER_AC_VALUES',
  resetEmployerFormData = 'RESET_EMPLOYER_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
  setEmployerFormData = 'SET_EMPLOYER_FORM_DATA',
  editEmployerForm = 'EDIT_EMPLOYER_FORM',
  editEmployerId = 'EDIT_EMPLOYER_ID',
  confirmationDialogOpen = 'DIALOG_OPEN',
}

export type EmployersTableName = 'employer' | 'numberOfEmployees';

export type EmployersTableHeader = `Employer's Name` | 'Number of Employees';

export interface IEmployersTableData {
  id: number;
  employer: string;
  numberOfEmployees: string;
}

export interface IEmployersApiResponseData {
  id: number;
  employer: string;
  employees_count: string;
}

export interface IEmployersTableHeader {
  [key: string]: EmployersTableName;
}

export interface IEmployersListQueryParams extends IMetaQueryParams {
  employer?: string;
}

export interface IEmployersListApiResponse {
  employers: IEmployersApiResponseData[] | IEmployersTableData[];
  meta: IMetaApiResponseData;
}

export interface IAddEmployerForm {
  name: string;
}

export interface IEmployerResponseObject {
  id: number | null;
  name: string;
}

export interface IEmployerRequestData {
  name?: string | null;
}

export interface IEditEmployerForm extends IAddEmployerForm {}

export interface IEditedEmployerFormData {
  name?: string;
}

export interface IViewEmployerApiResponseData {
  id: number;
  name: string;
}
