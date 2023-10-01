import * as React from 'react';
import { ILawyersState, lawyersReducer } from '../reducers/lawyersReducer';
import {
  addLawyerAutocompleteInitialValues,
  addLawyersInitialFormData,
} from './data/lawyersInitialData';

interface ILawyersStateProviderProps {
  children: React.ReactNode;
}

const initialState: ILawyersState = {
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
  addLawyerModalOpen: false,
  editLawyerModalOpen: false,
  addLawyerForm: addLawyersInitialFormData,
  addLawyerAutocompleteValues: addLawyerAutocompleteInitialValues,
  editLawyerAutocompleteValues: addLawyerAutocompleteInitialValues,
  editLawyerForm: addLawyersInitialFormData,
  editLawyerId: null,
  editedLawyerFormData: {},
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
  confirmationDialogOpen: false,
};

export const LawyersContext = React.createContext<{
  state: ILawyersState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const LawyersStateProvider = ({ children }: ILawyersStateProviderProps) => {
  const [state, dispatch] = React.useReducer(lawyersReducer, initialState);

  return (
    <LawyersContext.Provider value={{ state, dispatch }}>
      {children}
    </LawyersContext.Provider>
  );
};

const useLawyers = () => React.useContext(LawyersContext);

export { LawyersStateProvider, useLawyers };
