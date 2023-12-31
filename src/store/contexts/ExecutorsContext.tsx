import * as React from 'react';
import {
  IExecutorsState,
  executorsReducer,
} from '../reducers/executorsReducer';
import {
  addExecutorAutocompleteInitialValues,
  addExecutorsInitialFormData,
} from './data/executorsInitialData';

interface IExecutorsStateProviderProps {
  children: React.ReactNode;
}

const initialState: IExecutorsState = {
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
  addExecutorModalOpen: false,
  editExecutorModalOpen: false,
  addExecutorForm: addExecutorsInitialFormData,
  addExecutorAutocompleteValues: addExecutorAutocompleteInitialValues,
  editExecutorForm: addExecutorsInitialFormData,
  editExecutorAutocompleteValues: addExecutorAutocompleteInitialValues,
  editExecutorId: null,
  editedExecutorFormData: {},
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
  confirmationDialogOpen: false,
};

export const ExecutorsContext = React.createContext<{
  state: IExecutorsState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const ExecutorsStateProvider = ({ children }: IExecutorsStateProviderProps) => {
  const [state, dispatch] = React.useReducer(executorsReducer, initialState);

  return (
    <ExecutorsContext.Provider value={{ state, dispatch }}>
      {children}
    </ExecutorsContext.Provider>
  );
};

const useExecutors = () => React.useContext(ExecutorsContext);

export { ExecutorsStateProvider, useExecutors };
