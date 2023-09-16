import { Moment } from 'moment';
import {
  IAutocompleteOption,
  IMetaApiResponseData,
  IMetaQueryParams,
} from './universalTypes';

export enum ETransactionType {
  payment = 'payment',
  fee = 'fee',
  legal_fee = 'legal_fee',
  withdrawal = 'withdrawal',
}

export enum ETransactionTypeFilter {
  payment = 'payment',
  fee = 'fee',
  legal_fee = 'legal_fee',
  withdrawal = 'withdrawal',
  all = 'all',
}

export enum ETransactionsActionType {
  addTransactionModalOpen = 'ADD_TRANSACTION_MODAL_OPEN',
  addTransactionForm = 'ADD_TRANSACTION_FORM',
  addTransactionAutocompleteValues = 'ADD_TRANSACTION_AC_VALUES',
  resetTransactionFormData = 'RESET_TRANSACTION_FORM_DATA',
}

export type TransactionsTableName =
  | 'debtorsName'
  | 'type'
  | 'amount'
  | 'postingMethod'
  | 'paymentDate'
  | 'caseNumber'
  | 'excerptNumber';

export type TransactionsTableHeader =
  | "Debtor's name"
  | 'Type'
  | 'Amount'
  | 'Posting Method'
  | 'Payment Date'
  | 'Case Number'
  | 'Excerpt Number';

export interface ITransactionsTableData {
  debtorsName: string;
  displayType: string;
  amount: number;
  postingMethod: string;
  paymentDate: string;
  caseNumber: string;
  excerptNumber: string;
  type?: string;
}

export interface ITransactionsApiResponseData {
  first_name?: string;
  last_name?: string;
  name?: string;
  displayType: string;
  type: string;
  amount: number;
  posting_method: string;
  payment_date: string;
  case_number: string;
  excerpt_number: string;
}

export interface ITransactionsTableHeader {
  [key: string]: TransactionsTableName;
}

export interface ITransactionsListQueryParams extends IMetaQueryParams {
  debtorsName?: string;
  amount?: number;
  posting_method?: string;
  case_number?: string;
  excerpt_number?: string;
  filter?: ETransactionTypeFilter;
}

export interface ITransactionsListApiResponse {
  transactions: ITransactionsApiResponseData[] | ITransactionsTableData[];
  meta: IMetaApiResponseData;
}

export interface IAddTransactionForm {
  caseNumber: IAutocompleteOption<string> | string;
  type: IAutocompleteOption<ETransactionType> | string;
  amount: string;
  postingMethod?: string | null;
  paymentDate?: Moment | null;
}

export interface IAddTransactionAutocompleteValues {
  caseNumber: string;
  type: ETransactionType | '';
}

export interface ITransactionResponseObject {
  id: number | null;
  case_number?: string;
  type?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
}

export interface ITransactionRequestData {
  case_number: string;
  type: ETransactionType | string;
  amount: number;
  payment_date: string | null;
  posting_method: string | null;
}
