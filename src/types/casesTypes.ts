import { Moment } from 'moment';
import {
  IAutocompleteOption,
  IMetaApiResponseData,
  IMetaQueryParams,
} from './universalTypes';

export enum EState {
  active = 'active',
  closed = 'closed',
  all = 'all',
}

export enum ECasesActionType {
  isLegalEntity = 'IS_LEGAL',
  addCaseModalOpen = 'ADD_CASE_MODAL_OPEN',
  editCaseModalOpen = 'EDIT_CASE_MODAL_OPEN',
  addCaseForm = 'ADD_CASE_FORM',
  addCaseAutocompleteValues = 'ADD_CASE_AC_VALUES',
  resetCaseFormData = 'RESET_CASE_FORM_DATA',
  setCaseFormData = 'SET_CASE_FORM_DATA',
  editCaseForm = 'EDIT_CASE_FORM',
  editCaseAutocompleteValues = 'EDIT_CASE_AC_VALUES',
  editCaseId = 'EDIT_CASE_ID',
  confirmationDialogOpen = 'DIALOG_OPEN',
  filterableByClient = 'FILTERABLE_BY_CLIENT',
}

export type CasesFirstRowName =
  | 'name'
  | 'jmbg_pib'
  | 'caseNumber'
  | 'contractNumber'
  | 'executors'
  | 'lawyer'
  | 'ssn'
  | 'package'
  | 'state'
  | 'businessNumbers'
  | 'cession'
  | 'principal'
  | 'interest';

export type CasesFirstRowHeader =
  | 'Name'
  | 'JMBG / PIB'
  | 'Case Number'
  | 'Contract Number'
  | 'Executors'
  | 'Lawyer'
  | 'SSN'
  | 'Package'
  | 'Status'
  | 'Business Numbers'
  | 'Cession'
  | 'Principal'
  | 'Interest';

export interface ICasesFirstRowData {
  id: number;
  name: string;
  jmbg_pib: string;
  caseNumber: string;
  contractNumber: string;
  executors: string;
  lawyer: string;
  cession: JSX.Element;
  ssn: string;
  package: string;
  state: EState;
  businessNumbers: string;
  principal: string;
  interest: string;
}

export interface ICaseApiResponseData {
  id: number;
  case_number: string;
  contract_number: string;
  state: EState;
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
  executors: string;
  business_numbers: string;
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
  executors?: string;
  ssn?: string;
  package?: string;
  client?: string;
  court?: string;
  filter?: EState;
  clientsFilter?: number;
}

export interface ICasesListApiResponse {
  cases: ICaseApiResponseData[] | ICasesFirstRowData[];
  meta: IMetaApiResponseData;
}

export interface IAddCaseForm {
  legalEntity: boolean;
  firstName?: string;
  lastName?: string;
  jmbg?: string;
  name?: string;
  pib?: string;
  employed?: boolean;
  employer?: IAutocompleteOption<string> | string;
  executors: IAutocompleteOption<string>[];
  cession: boolean;
  phoneNumbers: string[];
  address: string;
  email: string;
  zipCode: string;
  city: IAutocompleteOption<string> | string;
  caseNumber: string;
  contractNumber: string;
  closingDate: Moment | null;
  businessNumbers: string[];
  lawyer: IAutocompleteOption<string> | string;
  client: IAutocompleteOption<string> | string;
  court: IAutocompleteOption<string> | string;
  ssnNumber: IAutocompleteOption<string> | string;
  package: IAutocompleteOption<string> | string;
  principal: string;
  interest: string;
}

export interface IAddCaseAutocompleteValues {
  employer: string;
  executors: string;
  lawyer: string;
  client: string;
  court: string;
  city: string;
  ssnNumber: string;
  package: string;
}

export interface ICaseResponseObject {
  id: number | null;
  name?: string;
  package_name?: string;
  first_name?: string;
  last_name?: string;
  ssn?: string;
}

export interface ICaseRequestData {
  first_name?: string | null;
  last_name?: string | null;
  jmbg?: string | null;
  name?: string | null;
  pib?: string | null;
  employed?: boolean | null;
  employer_id?: number | null;
  executor_ids?: (number | null)[];
  business_numbers?: string[];
  phone_numbers?: string[];
  cession?: boolean | null;
  address?: string | null;
  email?: string | null;
  zip_code?: string | null;
  city_id?: number | null;
  case_number?: number | null;
  contract_number?: number | null;
  closing_date?: string | null;
  lawyer_id?: number | null;
  client_id?: number | null;
  court_id?: number | null;
  ssn_number_id?: number | null;
  package_id?: number | null;
  principal?: number | null;
  interest?: number | null;
}

export interface IEditCaseAutocompleteValues
  extends IAddCaseAutocompleteValues {}

export interface IEditCaseForm extends IAddCaseForm {}

export interface IEditedCaseFormData {
  legalEntity?: boolean;
  firstName?: string;
  lastName?: string;
  jmbg?: string;
  name?: string;
  pib?: string;
  employed?: boolean;
  employer?: IAutocompleteOption<string> | string;
  executors?: IAutocompleteOption<string>[];
  cession?: boolean;
  phoneNumbers?: string[];
  address?: string;
  email?: string;
  zipCode?: string;
  city?: IAutocompleteOption<string> | string;
  caseNumber?: string;
  contractNumber?: string;
  closingDate?: Moment | null;
  businessNumbers?: string[];
  lawyer?: IAutocompleteOption<string> | string;
  client?: IAutocompleteOption<string> | string;
  court?: IAutocompleteOption<string> | string;
  ssnNumber?: IAutocompleteOption<string> | string;
  package?: IAutocompleteOption<string> | string;
  principal?: string;
  interest?: string;
}

export interface IViewCaseApiResponseData {
  id: number;
  case_number: string;
  contract_number: string;
  closing_date: string;
  state: string;
  principal: number;
  interest: number;
  is_legal: boolean;
  cession: boolean;
  address: string;
  email: string;
  zip_code: string;
  first_name: string;
  last_name: string;
  jmbg: string;
  employed: boolean;
  name: string;
  pib: string;
  lawyer: {
    id: number;
    office_name: string;
    first_name: string;
    last_name: string;
  };
  ssn_number: {
    id: number;
    ssn: string;
  };
  package: {
    id: number;
    package_name: string;
  };
  status: {
    id: number;
    name: string;
  };
  client: {
    id: number;
    name: string;
  };
  court: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
  employer: {
    id: number;
    name: string;
  };
  executors: {
    id: number;
    first_name: string;
    last_name: string;
  }[];
  business_numbers: {
    id: number;
    number: string;
  }[];
  phone_numbers: string[];
}
