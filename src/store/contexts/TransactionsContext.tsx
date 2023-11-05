import * as React from 'react';
import {
  ITransactionsState,
  transactionsReducer,
} from '../reducers/transactionsReducer';
import {
  addTransactionAutocompleteInitialValues,
  addTransactionsInitialFormData,
} from './data/transactionsInitialData';
import { ETransactionTypeFilter } from '../../types/transactionsTypes';

interface ITransactionsStateProviderProps {
  children: React.ReactNode;
}

export const initialState: ITransactionsState = {
  sortable: {
    sort: '',
    sortBy: '',
  },
  pageable: {
    page: 1,
    size: 25,
    totalNumber: null,
  },
  searchable: [],
  filterable: ETransactionTypeFilter.payment,
  addTransactionModalOpen: false,
  editTransactionModalOpen: false,
  addTransactionForm: addTransactionsInitialFormData,
  addTransactionAutocompleteValues: addTransactionAutocompleteInitialValues,
  editTransactionForm: addTransactionsInitialFormData,
  editTransactionId: null,
  editedTransactionFormData: {},
  editTransactionAutocompleteValues: addTransactionAutocompleteInitialValues,
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
  confirmationDialogOpen: false,
  exportFileType: 'excel',
  downloadFile: false,
  totalAmount: '',
  transactionsFileForUpload: null,
  importTransactionsDialogOpen: false,
  exportTransactionsDialogOpen: false,
  filterableDate: null,
};

export const TransactionsContext = React.createContext<{
  state: ITransactionsState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const TransactionsStateProvider = ({
  children,
}: ITransactionsStateProviderProps) => {
  const [state, dispatch] = React.useReducer(transactionsReducer, initialState);

  return (
    <TransactionsContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransactions = () => React.useContext(TransactionsContext);

export { TransactionsStateProvider, useTransactions };
