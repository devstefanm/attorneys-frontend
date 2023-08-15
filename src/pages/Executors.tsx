import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ExecutorsTable } from '../features/executors/ExecutorsTable';
import { ExecutorsStateProvider } from '../store/contexts/ExecutorsContext';

type Props = IPagesProps & {};

const Executors = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <ExecutorsStateProvider>
          <ExecutorsTable />
        </ExecutorsStateProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Executors };
