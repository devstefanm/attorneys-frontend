import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CourtsTable } from '../features/courts/CourtsTable';
import { CitiesTable } from '../features/cities/CitiesTable';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCourts } from '../store/contexts/CourtsContext';
import { useCities } from '../store/contexts/CitiesContext';
import { ECourtsActionType } from '../types/courtsTypes';
import { ECitiesActionType } from '../types/citiesTypes';
import AddCourtModal from '../features/courts/AddCourtModal';
import AddCityModal from '../features/cities/AddCityModal';

type Props = IPagesProps & {};

const CourtsAndCities = (_props: Props) => {
  const { t } = useTranslation();

  const {
    state: { addCourtModalOpen },
    dispatch: updateCourtsState,
  } = useCourts();

  const {
    state: { addCityModalOpen },
    dispatch: updateCitiesState,
  } = useCities();

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="flex flex-col lg:flex-row gap-4">
          <Box className="w-full">
            <Box className="my-2 flex justify-end">
              <Button
                onClick={() =>
                  updateCourtsState({
                    type: ECourtsActionType.addCourtModalOpen,
                    payload: !addCourtModalOpen,
                  })
                }
              >
                {t('entities.addNewCourt')}
              </Button>
            </Box>
            <CourtsTable />
          </Box>
          <Box className="w-full">
            <Box className="my-2 flex justify-end">
              <Button
                onClick={() =>
                  updateCitiesState({
                    type: ECitiesActionType.addCityModalOpen,
                    payload: !addCityModalOpen,
                  })
                }
              >
                {t('entities.addNewCity')}
              </Button>
            </Box>
            <CitiesTable />
          </Box>
        </Box>
        <AddCourtModal
          open={addCourtModalOpen}
          onClose={() =>
            updateCourtsState({
              type: ECourtsActionType.addCourtModalOpen,
              payload: false,
            })
          }
        />
        <AddCityModal
          open={addCityModalOpen}
          onClose={() =>
            updateCitiesState({
              type: ECitiesActionType.addCityModalOpen,
              payload: false,
            })
          }
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { CourtsAndCities };
