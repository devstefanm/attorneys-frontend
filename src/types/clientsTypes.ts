import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export type ClientsTableName = 'client' | 'numberOfCases';

export type ClientsTableHeader = `Client` | 'Number of Cases';

export interface IClientsTableData {
  client: string;
  numberOfCases: string;
}

export interface IClientsApiResponseData {
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
