import * as React from 'react';
import { IClientsState, clientsReducer } from '../reducers/clientsReducer';

interface IClientsStateProviderProps {
  children: React.ReactNode;
}

const initialState: IClientsState = {
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

export const ClientsContext = React.createContext<{
  state: IClientsState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const ClientsStateProvider = ({ children }: IClientsStateProviderProps) => {
  const [state, dispatch] = React.useReducer(clientsReducer, initialState);

  return (
    <ClientsContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientsContext.Provider>
  );
};

const useClients = () => React.useContext(ClientsContext);

export { ClientsStateProvider, useClients };