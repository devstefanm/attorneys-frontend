import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export type LawyersTableName =
  | 'name'
  | 'officeName'
  | 'email'
  | 'address'
  | 'city'
  | 'phoneNumber'
  | 'displayPhoneNumber'
  | 'numberOfCases';

export type LawyersTableHeader =
  | 'Name'
  | 'Office Name'
  | 'Email'
  | 'Address'
  | 'City'
  | 'Phone Number'
  | 'Number of Cases';

export interface ILawyersTableData {
  name: string;
  officeName: string;
  email: string;
  address: string;
  city: string;
  phoneNumber: string;
  displayPhoneNumber: string;
  numberOfCases: string;
}

export interface ILawyersApiResponseData {
  first_name: string;
  last_name: string;
  office_name: string;
  email: string;
  address: string;
  city: string;
  phone_number: string;
  display_phone_number: string;
  case_count: string;
}

export interface ILawyersTableHeader {
  [key: string]: LawyersTableName;
}

export interface ILawyersListQueryParams extends IMetaQueryParams {
  name?: string;
  office_name?: string;
  email?: string;
}

export interface ILawyersListApiResponse {
  lawyers: ILawyersApiResponseData[] | ILawyersTableData[];
  meta: IMetaApiResponseData;
}
