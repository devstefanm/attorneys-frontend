import { Moment } from 'moment';
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

export interface IAutocompleteOption {
  id: number;
  name: string;
}

export interface IAddCaseForm {
  legalEntity: boolean;
  firstName: string;
  lastName: string;
  jmbg: string;
  name: string;
  pib: string;
  employed: boolean;
  employer: IAutocompleteOption | string;
  executor: IAutocompleteOption | string;
  cession: boolean;
  phoneNumbers: string[];
  address: string;
  email: string;
  zipCode: string;
  city: IAutocompleteOption | string;
  caseNumber: string;
  contractNumber: string;
  closingDate: Moment | null;
  businessNumbers: string[];
  lawyer: IAutocompleteOption | string;
  client: IAutocompleteOption | string;
  court: IAutocompleteOption | string;
  ssnNumber: IAutocompleteOption | string;
  package: IAutocompleteOption | string;
  principal: string;
  interest: string;
}

export interface IAddCaseStateUpdate {
  name: string;
  fieldValue: string;
}

export interface IAddCaseAutocompleteInputChange {
  inputName: string;
  inputValue: string;
}

export interface IAddCaseAutocompleteValues {
  employer: string;
  executor: string;
  lawyer: string;
  client: string;
  court: string;
  city: string;
  ssnNumber: string;
  package: string;
}

export interface IResponseObject {
  id: number;
  name?: string;
  package_name?: string;
  first_name?: string;
  last_name?: string;
  ssn?: string;
}

export interface ICaseRequestData {
  first_name?: string;
  last_name?: string;
  jmbg?: string;
  name?: string;
  pib?: string;
  employed?: boolean;
  employer_id?: number | null;
  executor_id: number | null;
  business_numbers: string[];
  phone_numbers: string[];
  cession: boolean;
  address: string;
  email: string;
  zip_code: string;
  city_id: number | null;
  case_number: number;
  contract_number: number;
  closing_date: string | null;
  lawyer_id: number | null;
  client_id: number | null;
  court_id: number | null;
  ssn_number_id: number | null;
  package_id: number | null;
  principal: number;
  interest: number;
}
