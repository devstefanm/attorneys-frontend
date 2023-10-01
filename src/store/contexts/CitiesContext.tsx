import * as React from 'react';
import { ICitiesState, citiesReducer } from '../reducers/citiesReducer';
import { addCitiesInitialFormData } from './data/citiesInitialData';

interface ICitiesStateProviderProps {
  children: React.ReactNode;
}

const initialState: ICitiesState = {
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
  addCityModalOpen: false,
  editCityModalOpen: false,
  addCityForm: addCitiesInitialFormData,
  editCityForm: addCitiesInitialFormData,
  editCityId: null,
  editedCityFormData: {},
  openSuccessSnackbar: false,
  openErrorSnackbar: false,
  confirmationDialogOpen: false,
};

export const CitiesContext = React.createContext<{
  state: ICitiesState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const CitiesStateProvider = ({ children }: ICitiesStateProviderProps) => {
  const [state, dispatch] = React.useReducer(citiesReducer, initialState);

  return (
    <CitiesContext.Provider value={{ state, dispatch }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => React.useContext(CitiesContext);

export { CitiesStateProvider, useCities };
