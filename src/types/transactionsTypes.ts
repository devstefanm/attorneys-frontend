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
  editTransactionModalOpen = 'EDIT_TRANSACTION_MODAL_OPEN',
  addTransactionForm = 'ADD_TRANSACTION_FORM',
  addTransactionAutocompleteValues = 'ADD_TRANSACTION_AC_VALUES',
  resetTransactionFormData = 'RESET_TRANSACTION_FORM_DATA',
  openSuccessSnackbar = 'SUCCESS_SNACKBAR',
  openErrorSnackbar = 'ERROR_SNACKBAR',
  editTransactionAutocompleteValues = 'EDIT_TRANSACTION_AC_VALUES',
  setTransactionFormData = 'SET_TRANSACTION_FORM_DATA',
  editTransactionForm = 'EDIT_TRANSACTION_FORM',
  editTransactionId = 'EDIT_TRANSACTION_ID',
  confirmationDialogOpen = 'DIALOG_OPEN',
  totalAmount = 'TOTAL_AMOUNT',
  transactionsFileForUpload = 'TRANSACTIONS_FILE',
  exportTransactionsDialogOpen = 'EXPORT_TRANSACTIONS_DIALOG_OPEN',
  importTransactionsDialogOpen = 'IMPORT_TRANSACTIONS_DIALOG_OPEN',
  filterableDate = 'FILTERABLE_DATE',
  exportFileType = 'EXPORT_FILE_TYPE',
  downloadFile = 'DOWNLOAD_FILE',
  resetTransactionStates = 'RESET_TRANSACTION_STATES',
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
  id: number;
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
  id: number;
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

export interface ITransactionsFiltersData {
  debtorsName?: string;
  amount?: number;
  posting_method?: string;
  case_number?: string;
  excerpt_number?: string;
  filter?: ETransactionTypeFilter;
  filterableDate?: Moment | string | null;
  fileType?: 'excel' | 'csv';
  downloadFile?: boolean;
}

export interface ITransactionsListQueryParams extends IMetaQueryParams {
  debtorsName?: string;
  amount?: number;
  posting_method?: string;
  case_number?: string;
  excerpt_number?: string;
  filter?: ETransactionTypeFilter;
  filterableDate?: string | null;
}

export interface ITransactionsListApiResponse {
  transactions: ITransactionsApiResponseData[] | ITransactionsTableData[];
  total_amount?: string | null;
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
  case_number?: string;
  type?: ETransactionType | string | null;
  amount?: number | null;
  payment_date?: string | null;
  posting_method?: string | null;
  case_id?: number | string | null;
}

export interface IEditTransactionForm extends IAddTransactionForm {}

export interface IEditedTransactionFormData {
  caseNumber?: IAutocompleteOption<string> | string;
  type?: IAutocompleteOption<ETransactionType> | string;
  amount?: string | null;
  postingMethod?: string | null;
  paymentDate?: Moment | null;
}

export interface IViewTransactionApiResponseData {
  id: number;
  type: ETransactionType;
  amount: number;
  posting_method: string;
  payment_date: string;
  case: {
    id: number;
    name: string | null;
    first_name: string | null;
    last_name: string | null;
    case_number: string;
  };
}
