import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export type PackagesTableName = 'packageName' | 'numberOfCases';

export type PackagesTableHeader = 'Package Name' | 'Number of Cases';

export interface IPackagesTableData {
  packageName: string;
  numberOfCases: string;
}

export interface IPackagesApiResponseData {
  package_name: string;
  case_count: string;
}

export interface IPackagesTableHeader {
  [key: string]: PackagesTableName;
}

export interface IPackagesListQueryParams extends IMetaQueryParams {
  name?: string;
}

export interface IPackagesListApiResponse {
  packages: IPackagesApiResponseData[] | IPackagesTableData[];
  meta: IMetaApiResponseData;
}

export interface IPackageName {
  id?: number;
  package_name: string;
}
