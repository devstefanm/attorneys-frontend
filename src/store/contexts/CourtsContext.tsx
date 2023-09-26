import * as React from 'react';
import { ICourtsState, courtsReducer } from '../reducers/courtsReducer';
import { addCourtsInitialFormData } from './data/courtsInitialData';

interface ICourtsStateProviderProps {
  children: React.ReactNode;
}

const initialState: ICourtsState = {
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
  addCourtModalOpen: false,
  addCourtForm: addCourtsInitialFormData,
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
};

export const CourtsContext = React.createContext<{
  state: ICourtsState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const CourtsStateProvider = ({ children }: ICourtsStateProviderProps) => {
  const [state, dispatch] = React.useReducer(courtsReducer, initialState);

  return (
    <CourtsContext.Provider value={{ state, dispatch }}>
      {children}
    </CourtsContext.Provider>
  );
};

const useCourts = () => React.useContext(CourtsContext);

export { CourtsStateProvider, useCourts };
