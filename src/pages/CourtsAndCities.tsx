import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CitiesTable } from '../features/cities/CitiesTable';
import { CitiesStateProvider } from '../store/contexts/CitiesContext';
import { CourtsStateProvider } from '../store/contexts/CourtsContext';
import { CourtsTable } from '../features/courts/CourtsTable';
import { Box } from '@mui/material';

type Props = IPagesProps & {};

const CourtsAndCities = (_props: Props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="flex flex-col lg:flex-row gap-4">
          <CourtsStateProvider>
            <CourtsTable />
          </CourtsStateProvider>
          <CitiesStateProvider>
            <CitiesTable />
          </CitiesStateProvider>
        </Box>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { CourtsAndCities };
