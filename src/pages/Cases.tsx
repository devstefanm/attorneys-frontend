import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CasesTable } from '../features/cases/CasesTable';
import { CasesStateProvider } from '../store/contexts/CasesContext';

type Props = IPagesProps & {};

const Cases = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <CasesStateProvider>
          <CasesTable />
        </CasesStateProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Cases };
