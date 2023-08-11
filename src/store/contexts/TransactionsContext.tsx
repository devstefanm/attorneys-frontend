import * as React from 'react';
import {
  ITransactionsState,
  transactionsReducer,
} from '../reducers/transactionsReducer';

interface ITransactionsStateProviderProps {
  children: React.ReactNode;
}

const initialState: ITransactionsState = {
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
