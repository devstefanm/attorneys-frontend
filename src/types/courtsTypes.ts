import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

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
