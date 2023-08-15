import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SSNNumbersTable } from '../features/ssnNumbers/SSNNumbersTable';
import { SSNNumbersStateProvider } from '../store/contexts/SSNNumbersContext';
import { PackagesStateProvider } from '../store/contexts/PackagesContext';
import { PackagesTable } from '../features/packages/PackagesTable';
import { Box } from '@mui/material';

type Props = IPagesProps & {};

const SSNNumbersAndPackages = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="flex flex-col lg:flex-row gap-4">
          <SSNNumbersStateProvider>
            <SSNNumbersTable />
          </SSNNumbersStateProvider>
          <PackagesStateProvider>
            <PackagesTable />
          </PackagesStateProvider>
        </Box>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { SSNNumbersAndPackages };
