import {
  IAddTransactionAutocompleteValues,
  IAddTransactionForm,
} from '../../../types/transactionsTypes';

export const addTransactionsInitialFormData: IAddTransactionForm = {
  caseNumber: '',
  amount: '',
  type: '',
  paymentDate: null,
  postingMethod: 'GD',
};

export const addTransactionAutocompleteInitialValues: IAddTransactionAutocompleteValues =
  {
    caseNumber: '',
    type: '',
  };
