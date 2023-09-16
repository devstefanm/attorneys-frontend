import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum ECourtsActionType {
  addCourtModalOpen = 'ADD_COURT_MODAL_OPEN',
  addCourtForm = 'ADD_COURT_FORM',
  addCourtAutocompleteValues = 'ADD_COURT_AC_VALUES',
  resetCourtFormData = 'RESET_COURT_FORM_DATA',
}

export type CourtsTableName = 'court' | 'numberOfCases';

export type CourtsTableHeader = `Court` | 'Number of Cases';

export interface ICourtsTableData {
  court: string;
  numberOfCases: string;
}

export interface ICourtsApiResponseData {
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
  name: string;
}
