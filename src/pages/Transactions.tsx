import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TransactionsTable } from '../features/transactions/TransactionsTable';
import { TransactionsStateProvider } from '../store/contexts/TransactionsContext';

type Props = IPagesProps & {};

const Transactions = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <TransactionsStateProvider>
          <TransactionsTable />
        </TransactionsStateProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Transactions };
