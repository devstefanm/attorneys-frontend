export interface IApiResponse<T> {
  data: { data?: T; error?: number; message?: string };
}

export interface INavItem {
  id: number;
  icon: JSX.Element;
  name: string;
  path: string;
}

export type SortingDirection = 'asc' | 'desc' | '';

export interface ITableSortable {
  sort: string;
  sortBy: SortingDirection;
}

export interface IMetaQueryParams extends ITableSortable, IBasePageable {
  size: number;
}

export interface IBasePageable {
  page: number;
}

export interface IMetaApiResponseData extends ITableSortable, IBasePageable {
  total_number: number;
  total_pages: number;
}

export interface ITablePageable extends IBasePageable {
  size: number;
  totalNumber: number | null;
}

export interface ISortingDirectionOptions {
  previous: SortingDirection;
  next: SortingDirection;
}

export enum ETableActionType {
  sortable = 'SORTABLE',
  pageable = 'PAGEABLE',
  searchable = 'SEARCHABLE',
  filterable = 'FILTERABLE',
}

export interface ITableSearchable {
  key: string;
  value: string;
}

export enum EFormFieldType {
  toggle = 'toggle',
  input = 'input',
  checkbox = 'checkbox',
  autocomplete = 'autocomplete',
  datepicker = 'datepicker',
  dynamicInputs = 'dynamic-inputs',
  dynamicAutocompletes = 'dynamic-autocompletes',
}

export interface IFormField {
  name: string;
  type: EFormFieldType;
  label?: string;
  subfieldName?: string;
  options?: any[];
  condition?: string | boolean;
  secondCondition?: string | boolean;
  gridWidth?: number;
  format?: RegExp;
  gridClassName?: string;
  formFieldClassName?: string;
  labelPlacement?: 'top' | 'bottom' | 'start' | 'end';
  size?: any;
}

export interface IAutocompleteParams {
  search: string;
}

export interface IShortNamesApiResponse {
  id: number;
  name: string;
}

export interface ILongNamesApiResponse {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IAutocompleteOption<T> {
  id: number | null;
  name: T;
}
