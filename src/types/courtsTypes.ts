import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum ECourtsActionType {
  addCourtModalOpen = 'ADD_COURT_MODAL_OPEN',
  editCourtModalOpen = 'EDIT_COURT_MODAL_OPEN',
  addCourtForm = 'ADD_COURT_FORM',
  addCourtAutocompleteValues = 'ADD_COURT_AC_VALUES',
  resetCourtFormData = 'RESET_COURT_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
  setCourtFormData = 'SET_COURT_FORM_DATA',
  editCourtForm = 'EDIT_COURT_FORM',
  editCourtId = 'EDIT_COURT_ID',
  confirmationDialogOpen = 'DIALOG_OPEN',
}

export type CourtsTableName = 'court' | 'numberOfCases';

export type CourtsTableHeader = `Court` | 'Number of Cases';

export interface ICourtsTableData {
  id: number;
  court: string;
  numberOfCases: string;
}

export interface ICourtsApiResponseData {
  id: number;
  court: string;
  case_count: string;
}

export interface ICourtsTableHeader {
  [key: string]: CourtsTableName;
}

export interface ICourtsListQueryParams extends IMetaQueryParams {
  court?: string;
}

export interface ICourtsListApiResponse {
  courts: ICourtsApiResponseData[] | ICourtsTableData[];
  meta: IMetaApiResponseData;
}

export interface IAddCourtForm {
  name: string;
}

export interface ICourtResponseObject {
  id: number | null;
  name: string;
}

export interface ICourtRequestData {
  name?: string | null;
}

export interface IEditCourtForm extends IAddCourtForm {}

export interface IEditedCourtFormData {
  name?: string;
}

export interface IViewCourtApiResponseData {
  id: number;
  name: string;
}
