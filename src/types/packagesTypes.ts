import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum EPackagesActionType {
  addPackageModalOpen = 'ADD_PACKAGE_MODAL_OPEN',
  addPackageForm = 'ADD_PACKAGE_FORM',
  addPackageAutocompleteValues = 'ADD_PACKAGE_AC_VALUES',
  resetPackageFormData = 'RESET_PACKAGE_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
}

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

export interface IAddPackageForm {
  packageName: string;
}

export interface IPackageResponseObject {
  id: number | null;
  package_name: string;
}

export interface IPackageRequestData {
  package_name: string;
}
