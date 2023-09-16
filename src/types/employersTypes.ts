import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum EEmployersActionType {
  addEmployerModalOpen = 'ADD_EMPLOYER_MODAL_OPEN',
  addEmployerForm = 'ADD_EMPLOYER_FORM',
  addEmployerAutocompleteValues = 'ADD_EMPLOYER_AC_VALUES',
  resetEmployerFormData = 'RESET_EMPLOYER_FORM_DATA',
}

export type EmployersTableName = 'employer' | 'numberOfEmployees';

export type EmployersTableHeader = `Employer's Name` | 'Number of Employees';

export interface IEmployersTableData {
  employer: string;
  numberOfEmployees: string;
}

export interface IEmployersApiResponseData {
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
  name: string;
}
