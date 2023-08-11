import { IMetaApiResponseData, IMetaQueryParams } from './universalTypes';

export enum ETransactionType {
  payment = 'payment',
  fee = 'fee',
  legal_fee = 'legal_fee',
}

export type TransactionsTableName =
  | 'type'
  | 'amount'
  | 'postingMethod'
  | 'paymentDate'
  | 'caseNumber'
  | 'excerptNumber';

export type TransactionsTableHeader =
  | 'Type'
  | 'Amount'
  | 'Posting Method'
  | 'Payment Date'
  | 'Case Number'
  | 'Excerpt Number';

export interface ITransactionsTableData {
  displayType: string;
  amount: number;
  postingMethod: string;
  paymentDate: string;
  caseNumber: string;
  excerptNumber: string;
}

export interface ITransactionsApiResponseData {
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
  amount?: number;
  posting_method?: string;
  case_number?: string;
  excerpt_number?: string;
}

export interface ITransactionsListApiResponse {
  transactions: ITransactionsApiResponseData[] | ITransactionsTableData[];
  meta: IMetaApiResponseData;
}
