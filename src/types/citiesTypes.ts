import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

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
