import * as React from 'react';
import {
  ISSNNumbersState,
  ssnNumbersReducer,
} from '../reducers/ssnNumbersReducer';
import { addSSNNumbersInitialFormData } from './data/ssnNumbersInitialData';

interface ISSNNumbersStateProviderProps {
  children: React.ReactNode;
}

const initialState: ISSNNumbersState = {
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
  addSSNNumberModalOpen: false,
  editSSNNumberModalOpen: false,
  addSSNNumberForm: addSSNNumbersInitialFormData,
  editSSNNumberForm: addSSNNumbersInitialFormData,
  editSSNNumberId: null,
  editedSSNNumberFormData: {},
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
  confirmationDialogOpen: false,
};

export const SSNNumbersContext = React.createContext<{
  state: ISSNNumbersState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const SSNNumbersStateProvider = ({
  children,
}: ISSNNumbersStateProviderProps) => {
  const [state, dispatch] = React.useReducer(ssnNumbersReducer, initialState);

  return (
    <SSNNumbersContext.Provider value={{ state, dispatch }}>
      {children}
    </SSNNumbersContext.Provider>
  );
};

const useSSNNumbers = () => React.useContext(SSNNumbersContext);

export { SSNNumbersStateProvider, useSSNNumbers };
