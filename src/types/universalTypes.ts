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
}

export interface ITableSearchable {
  key: string;
  value: string;
}
