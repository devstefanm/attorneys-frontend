import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum EStatus {
  active = 'active',
  closed = 'closed',
}

export type CasesFirstRowName =
  | 'name'
  | 'jmbg_pib'
  | 'caseNumber'
  | 'contractNumber'
  | 'lawyer'
  | 'ssn'
  | 'package'
  | 'status'
  | 'client'
  | 'court'
  | 'cession'
  | 'principal'
  | 'interest';

export type CasesFirstRowHeader =
  | 'Name'
  | 'JMBG / PIB'
  | 'Case Number'
  | 'Contract Number'
  | 'Lawyer'
  | 'SSN'
  | 'Package'
  | 'Status'
  | 'Client'
  | 'Court'
  | 'Cession'
  | 'Principal'
  | 'Interest';

export interface ICasesFirstRowData {
  name: string;
  jmbg_pib: string;
  caseNumber: string;
  contractNumber: string;
  lawyer: string;
  cession: JSX.Element;
  ssn: string;
  package: string;
  status: EStatus;
  client: string;
  court: string;
  principal: string;
  interest: string;
}

export interface ICaseApiResponseData {
  id: number;
  case_number: string;
  contract_number: string;
  status: EStatus;
  principal: string;
  interest: string;
  is_legal: boolean;
  cession: boolean;
  first_name: string | null;
  last_name: string | null;
  jmbg: string | null;
  name: string | null;
  pib: string | null;
  lawyer_office_name?: string;
  lawyer_first_name?: string;
  lawyer_last_name?: string;
  client_name: string;
  court_name: string;
  ssn: string | null;
  package: string | null;
}

export interface ICasesTableHeader {
  [key: string]: CasesFirstRowName;
}

export interface ICasesQueryParams extends IMetaQueryParams {
  name?: string;
  jmbg_pib?: string;
  case_number?: string;
  contract_number?: string;
  lawyer?: string;
}

export interface ICasesListApiResponse {
  cases: ICaseApiResponseData[] | ICasesFirstRowData[];
  meta: IMetaApiResponseData;
}
