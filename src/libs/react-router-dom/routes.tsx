import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthStateProvider } from '../../store/contexts/AuthContext';
import { CasesStateProvider } from '../../store/contexts/CasesContext';
import { TransactionsStateProvider } from '../../store/contexts/TransactionsContext';

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

const Lawyers = lazy(() =>
  import('../../pages/Lawyers').then(({ Lawyers }) => ({
    default: Lawyers,
  })),
);

const Executors = lazy(() =>
  import('../../pages/Executors').then(({ Executors }) => ({
    default: Executors,
  })),
);

const SSNNumbersAndPackages = lazy(() =>
  import('../../pages/SSNNumbersAndPackages').then(
    ({ SSNNumbersAndPackages }) => ({
      default: SSNNumbersAndPackages,
    }),
  ),
);

const ClientsAndEmployers = lazy(() =>
  import('../../pages/ClientsAndEmployers').then(({ ClientsAndEmployers }) => ({
    default: ClientsAndEmployers,
  })),
);

const CourtsAndCities = lazy(() =>
  import('../../pages/CourtsAndCities').then(({ CourtsAndCities }) => ({
    default: CourtsAndCities,
  })),
);

// HOC
export const AuthWithProvider = () => (
  <AuthStateProvider>
    <Auth />
  </AuthStateProvider>
);

export const CasesWithProvider = ({ pageLabel }: { pageLabel: string }) => (
  <CasesStateProvider>
    <Cases pageLabel={pageLabel} />
  </CasesStateProvider>
);

export const TransactionsWithProvider = ({
  pageLabel,
}: {
  pageLabel: string;
}) => (
  <TransactionsStateProvider>
    <Transactions pageLabel={pageLabel} />
  </TransactionsStateProvider>
);

export const routes = (isAuth: boolean, role: string | null) => [
  {
    path: '/',
    element: isAuth ? <Navigate to="/cases" /> : <Navigate to="/auth" />,
  },
  {
    path: 'auth',
    element: isAuth ? <Navigate to="/cases" /> : <AuthWithProvider />,
  },
  {
    path: 'cases',
    element:
      isAuth && role !== 'visitor' ? (
        <CasesWithProvider pageLabel="entities.cases" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
  {
    path: 'transactions',
    element:
      isAuth && role !== 'visitor' ? (
        <TransactionsWithProvider pageLabel="entities.transactions" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
  {
    path: 'lawyers',
    element:
      isAuth && role !== 'visitor' ? (
        <Lawyers pageLabel="entities.lawyers" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
  {
    path: 'executors',
    element:
      isAuth && role !== 'visitor' ? (
        <Executors pageLabel="entities.executors" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
  {
    path: 'ssn_numbers-and-packages',
    element:
      isAuth && role !== 'visitor' ? (
        <SSNNumbersAndPackages pageLabel="entities.ssnNumbersAndPackages" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
  {
    path: 'clients-and-employers',
    element:
      isAuth && role !== 'visitor' ? (
        <ClientsAndEmployers pageLabel="entities.clientsAndEmployers" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
  {
    path: 'courts-and-cities',
    element:
      isAuth && role !== 'visitor' ? (
        <CourtsAndCities pageLabel="entities.courtsAndCities" />
      ) : (
        <Navigate to="/auth" />
      ),
  },
];
