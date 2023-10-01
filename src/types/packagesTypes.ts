import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum EPackagesActionType {
  addPackageModalOpen = 'ADD_PACKAGE_MODAL_OPEN',
  editPackageModalOpen = 'EDIT_PACKAGE_MODAL_OPEN',
  addPackageForm = 'ADD_PACKAGE_FORM',
  addPackageAutocompleteValues = 'ADD_PACKAGE_AC_VALUES',
  resetPackageFormData = 'RESET_PACKAGE_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
  setPackageFormData = 'SET_PACKAGE_FORM_DATA',
  editPackageForm = 'EDIT_PACKAGE_FORM',
  editPackageId = 'EDIT_PACKAGE_ID',
  confirmationDialogOpen = 'DIALOG_OPEN',
}

export type PackagesTableName = 'packageName' | 'numberOfCases';

export type PackagesTableHeader = 'Package Name' | 'Number of Cases';

export interface IPackagesTableData {
  id: number;
  packageName: string;
  numberOfCases: string;
}

export interface IPackagesApiResponseData {
  id: number;
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
  package_name?: string | null;
}

export interface IEditPackageForm extends IAddPackageForm {}

export interface IEditedPackageFormData {
  packageName?: string;
}

export interface IViewPackageApiResponseData {
  id: number;
  package_name: string;
}
