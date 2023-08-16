import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export type EmployersTableName = 'employer' | 'numberOfEmployees';

export type EmployersTableHeader = `Employer's Name` | 'Number of Employees';

export interface IEmployersTableData {
  employer: string;
  numberOfEmployees: string;
}

export interface IEmployersApiResponseData {
  employer: string;
  employees_count: string;
}

export interface IEmployersTableHeader {
  [key: string]: EmployersTableName;
}

export interface IEmployersListQueryParams extends IMetaQueryParams {
  employer?: string;
}

export interface IEmployersListApiResponse {
  employers: IEmployersApiResponseData[] | IEmployersTableData[];
  meta: IMetaApiResponseData;
}
