import * as React from 'react';
import { ICasesState, casesReducer } from '../reducers/casesReducer';

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
