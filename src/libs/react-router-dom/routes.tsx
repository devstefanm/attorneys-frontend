import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthStateProvider } from '../../store/contexts/AuthContext';

export interface IPagesProps {
  pageLabel: string;
}

const Auth = lazy(() =>
  import('../../pages/Auth').then(({ Auth }) => ({ default: Auth })),
);

const Cases = lazy(() =>
  import('../../pages/Cases').then(({ Cases }) => ({ default: Cases })),
);

const Transactions = lazy(() =>
  import('../../pages/Transactions').then(({ Transactions }) => ({
    default: Transactions,
  })),
);

// HOC
export const AuthWithProvider = () => (
  <AuthStateProvider>
    <Auth />
  </AuthStateProvider>
);

export const routes = (isAuth: boolean, role: string | null) => [
  {
    path: '/',
    element: isAuth ? <Navigate to="/cases" /> : <Navigate to="/auth" />,
  },
  { path: 'auth', element: <AuthWithProvider /> },
  {
    path: 'cases',
    element:
      isAuth && role !== 'visitor' ? (
        <Cases pageLabel="entities.cases" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
  {
    path: 'transactions',
    element:
      isAuth && role !== 'visitor' ? (
        <Transactions pageLabel="entities.transactions" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
];
