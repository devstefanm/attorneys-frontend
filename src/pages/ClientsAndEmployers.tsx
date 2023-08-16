import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ClientsTable } from '../features/clients/ClientsTable';
import { ClientsStateProvider } from '../store/contexts/ClientsContext';
import { EmployersStateProvider } from '../store/contexts/EmployersContext';
import { EmployersTable } from '../features/employers/EmployersTable';
import { Box } from '@mui/material';

type Props = IPagesProps & {};

const ClientsAndEmployers = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="flex flex-col lg:flex-row gap-4">
          <ClientsStateProvider>
            <ClientsTable />
          </ClientsStateProvider>
          <EmployersStateProvider>
            <EmployersTable />
          </EmployersStateProvider>
        </Box>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { ClientsAndEmployers };
