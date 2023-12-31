import * as React from 'react';
import { ICasesState, casesReducer } from '../reducers/casesReducer';
import {
  addCaseAutocompleteInitialValues,
  addCasesInitialFormData,
  editCaseAutocompleteInitialValues,
  editCasesInitialFormData,
  initialCasesExportChecklistValues,
} from './data/casesInitialData';
import { ECaseCategory, EState } from '../../types/casesTypes';

interface ICasesStateProviderProps {
  children: React.ReactNode;
}

const initialState: ICasesState = {
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
  filterable: EState.active,
  filterableByClient: 9999,
  addCaseModalOpen: false,
  editCaseModalOpen: false,
  exportCasesDialogOpen: false,
  importCasesDialogOpen: false,
  isLegalEntity: false,
  addCaseForm: addCasesInitialFormData,
  addCaseAutocompleteValues: addCaseAutocompleteInitialValues,
  editCaseForm: editCasesInitialFormData,
  editCaseAutocompleteValues: editCaseAutocompleteInitialValues,
  editCaseId: null,
  editedCaseFormData: {},
  confirmationDialogOpen: false,
  exportFileType: 'excel',
  downloadFile: false,
  casesExportChecklistValues: initialCasesExportChecklistValues,
  casesFileForUpload: null,
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
  hasObjection: false,
  caseCategory: ECaseCategory.all,
};

export const CasesContext = React.createContext<{
  state: ICasesState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const CasesStateProvider = ({ children }: ICasesStateProviderProps) => {
  const [state, dispatch] = React.useReducer(casesReducer, initialState);

  return (
    <CasesContext.Provider value={{ state, dispatch }}>
      {children}
    </CasesContext.Provider>
  );
};

const useCases = () => React.useContext(CasesContext);

export { CasesStateProvider, useCases };
