import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum ECitiesActionType {
  addCityModalOpen = 'ADD_CITY_MODAL_OPEN',
  addCityForm = 'ADD_CITY_FORM',
  addCityAutocompleteValues = 'ADD_CITY_AC_VALUES',
  resetCityFormData = 'RESET_CITY_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
}

export type CitiesTableName =
  | 'city'
  | 'numberOfDebtors'
  | 'numberOfExecutors'
  | 'numberOfLawyers';

export type CitiesTableHeader =
  | `City`
  | 'Number of Debtors'
  | 'Number of Executors'
  | 'Number of Lawyers';

export interface ICitiesTableData {
  city: string;
  numberOfDebtors: string;
  numberOfExecutors: string;
  numberOfLawyers: string;
}

export interface ICitiesApiResponseData {
  city: string;
  debtor_count: string;
  executor_count: string;
  lawyer_count: string;
}

export interface ICitiesTableHeader {
  [key: string]: CitiesTableName;
}

export interface ICitiesListQueryParams extends IMetaQueryParams {
  city?: string;
}

export interface ICitiesListApiResponse {
  cities: ICitiesApiResponseData[] | ICitiesTableData[];
  meta: IMetaApiResponseData;
}

export interface IAddCityForm {
  name: string;
}

export interface ICityResponseObject {
  id: number | null;
  name: string;
}

export interface ICityRequestData {
  name: string;
}
