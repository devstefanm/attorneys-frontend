import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LawyersTable } from '../features/lawyers/LawyersTable';
import { LawyersStateProvider } from '../store/contexts/LawyersContext';

type Props = IPagesProps & {};

const Lawyers = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <LawyersStateProvider>
          <LawyersTable />
        </LawyersStateProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Lawyers };
