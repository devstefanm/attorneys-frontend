import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export type ExecutorsTableName =
  | 'name'
  | 'city'
  | 'phoneNumber'
  | 'displayPhoneNumber'
  | 'numberOfCases';

export type ExecutorsTableHeader =
  | 'Name'
  | 'City'
  | 'Phone Number'
  | 'Number of Cases';

export interface IExecutorsTableData {
  name: string;
  city: string;
  phoneNumber: string;
  displayPhoneNumber: string;
  numberOfCases: string;
}

export interface IExecutorsApiResponseData {
  first_name: string;
  last_name: string;
  city: string;
  phone_number: string;
  display_phone_number: string;
  case_count: string;
}

export interface IExecutorsTableHeader {
  [key: string]: ExecutorsTableName;
}

export interface IExecutorsListQueryParams extends IMetaQueryParams {
  name?: string;
}

export interface IExecutorsListApiResponse {
  executors: IExecutorsApiResponseData[] | IExecutorsTableData[];
  meta: IMetaApiResponseData;
}
