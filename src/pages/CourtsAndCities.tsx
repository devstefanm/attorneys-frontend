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
import { EditCityModal } from '../features/cities/EditCityModal';
import { EditCourtModal } from '../features/courts/EditCourtModal';
import { useTransactions } from '../store/contexts/TransactionsContext';
import { ETransactionsActionType } from '../types/transactionsTypes';

type Props = IPagesProps & {};

const CourtsAndCities = (_props: Props) => {
  const { t } = useTranslation();

  const {
    state: { addCourtModalOpen, editCourtModalOpen },
    dispatch: updateCourtsState,
  } = useCourts();

  const {
    state: { addCityModalOpen, editCityModalOpen },
    dispatch: updateCitiesState,
  } = useCities();

  const { dispatch: updateTransactionsState } = useTransactions();

  const handleAddCourtModalClose = () => {
    updateCourtsState({
      type: ECourtsActionType.addCourtModalOpen,
      payload: false,
    });
    updateCourtsState({
      type: ECourtsActionType.resetCourtFormData,
    });
  };

  const handleEditCourtModalClose = () => {
    updateCourtsState({
      type: ECourtsActionType.editCourtModalOpen,
      payload: false,
    });
    updateCourtsState({
      type: ECourtsActionType.resetCourtFormData,
    });
  };

  const handleAddCityModalClose = () => {
    updateCitiesState({
      type: ECitiesActionType.addCityModalOpen,
      payload: false,
    });
    updateCitiesState({
      type: ECitiesActionType.resetCityFormData,
    });
  };

  const handleEditCityModalClose = () => {
    updateCitiesState({
      type: ECitiesActionType.editCityModalOpen,
      payload: false,
    });
    updateCitiesState({
      type: ECitiesActionType.resetCityFormData,
    });
  };

  React.useEffect(() => {
    updateTransactionsState({
      type: ETransactionsActionType.resetTransactionStates,
    });
  }, []);

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
          onClose={handleAddCourtModalClose}
        />
        <EditCourtModal
          open={editCourtModalOpen}
          onClose={handleEditCourtModalClose}
        />
        <AddCityModal
          open={addCityModalOpen}
          onClose={handleAddCityModalClose}
        />
        <EditCityModal
          open={editCityModalOpen}
          onClose={handleEditCityModalClose}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { CourtsAndCities };
