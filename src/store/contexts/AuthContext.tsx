import * as React from 'react';
import { IAuthState, authReducer } from '../reducers/authReducer';
import { EAuthFormType } from '../../types/authTypes';

interface IAuthStateProviderProps {
  children: React.ReactNode;
}

const initialState: IAuthState = {
  authFormType: EAuthFormType.login,
  loginCredentials: {
    email: '',
    password: '',
  },
  showPassword: false,
};

export const AuthContext = React.createContext<{
  state: IAuthState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const AuthStateProvider = ({ children }: IAuthStateProviderProps) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthStateProvider, useAuth };
