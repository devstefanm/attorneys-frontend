import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum EClientsActionType {
  addClientModalOpen = 'ADD_CLIENT_MODAL_OPEN',
  editClientModalOpen = 'EDIT_CLIENT_MODAL_OPEN',
  addClientForm = 'ADD_CLIENT_FORM',
  addClientAutocompleteValues = 'ADD_CLIENT_AC_VALUES',
  resetClientFormData = 'RESET_CLIENT_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
  setClientFormData = 'SET_CLIENT_FORM_DATA',
  editClientForm = 'EDIT_CLIENT_FORM',
  editClientId = 'EDIT_CLIENT_ID',
  confirmationDialogOpen = 'DIALOG_OPEN',
}

export type ClientsTableName = 'client' | 'numberOfCases';

export type ClientsTableHeader = `Client` | 'Number of Cases';

export interface IClientsTableData {
  id: number;
  client: string;
  numberOfCases: string;
}

export interface IClientsApiResponseData {
  id: number;
  client: string;
  case_count: string;
}

export interface IClientsTableHeader {
  [key: string]: ClientsTableName;
}

export interface IClientsListQueryParams extends IMetaQueryParams {
  client?: string;
}

export interface IClientsListApiResponse {
  clients: IClientsApiResponseData[] | IClientsTableData[];
  meta: IMetaApiResponseData;
}

export interface IAddClientForm {
  name: string;
}

export interface IClientResponseObject {
  id: number | null;
  name: string;
}

export interface IClientRequestData {
  name?: string | null;
}

export interface IEditClientForm extends IAddClientForm {}

export interface IEditedClientFormData {
  name?: string;
}

export interface IViewClientApiResponseData {
  id: number;
  name: string;
}
