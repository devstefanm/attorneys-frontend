import * as React from 'react';
import { IPackagesState, packagesReducer } from '../reducers/packagesReducer';
import { addPackagesInitialFormData } from './data/packagesInitialData';

interface IPackagesStateProviderProps {
  children: React.ReactNode;
}

const initialState: IPackagesState = {
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
  addPackageModalOpen: false,
  addPackageForm: addPackagesInitialFormData,
};

export const PackagesContext = React.createContext<{
  state: IPackagesState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const PackagesStateProvider = ({ children }: IPackagesStateProviderProps) => {
  const [state, dispatch] = React.useReducer(packagesReducer, initialState);

  return (
    <PackagesContext.Provider value={{ state, dispatch }}>
      {children}
    </PackagesContext.Provider>
  );
};

const usePackages = () => React.useContext(PackagesContext);

export { PackagesStateProvider, usePackages };
