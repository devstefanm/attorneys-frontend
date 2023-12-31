import * as React from 'react';
import {
  IEmployersState,
  employersReducer,
} from '../reducers/employersReducer';
import { addEmployersInitialFormData } from './data/employersInitialData';

interface IEmployersStateProviderProps {
  children: React.ReactNode;
}

const initialState: IEmployersState = {
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
  addEmployerModalOpen: false,
  editEmployerModalOpen: false,
  addEmployerForm: addEmployersInitialFormData,
  editEmployerForm: addEmployersInitialFormData,
  editEmployerId: null,
  editedEmployerFormData: {},
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
  confirmationDialogOpen: false,
};

export const EmployersContext = React.createContext<{
  state: IEmployersState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const EmployersStateProvider = ({ children }: IEmployersStateProviderProps) => {
  const [state, dispatch] = React.useReducer(employersReducer, initialState);

  return (
    <EmployersContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployersContext.Provider>
  );
};

const useEmployers = () => React.useContext(EmployersContext);

export { EmployersStateProvider, useEmployers };
