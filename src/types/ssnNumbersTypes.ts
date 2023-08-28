import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

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
