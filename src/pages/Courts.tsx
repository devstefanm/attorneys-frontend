import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
// import { CourtsTable } from '../features/courts/CourtsTable';
// import { CourtsStateProvider } from '../store/contexts/CourtsContext';

type Props = IPagesProps & {};

const Courts = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        {/* <CourtsStateProvider>
          <CourtsTable />
        </CourtsStateProvider> */}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Courts };
