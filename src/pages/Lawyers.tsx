import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LawyersTable } from '../features/lawyers/LawyersTable';
import { useLawyers } from '../store/contexts/LawyersContext';
import AddLawyerModal from '../features/lawyers/AddLawyerModal';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ELawyersActionType } from '../types/lawyersTypes';

type Props = IPagesProps & {};

const Lawyers = (_props: Props) => {
  const { t } = useTranslation();
  const {
    state: { addLawyerModalOpen },
    dispatch: updateLawyersState,
  } = useLawyers();
  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="my-2 flex justify-end">
          <Button
            onClick={() =>
              updateLawyersState({
                type: ELawyersActionType.addLawyerModalOpen,
                payload: !addLawyerModalOpen,
              })
            }
          >
            {t('entities.addNewLawyer')}
          </Button>
        </Box>
        <LawyersTable />
        <AddLawyerModal
          open={addLawyerModalOpen}
          onClose={() =>
            updateLawyersState({
              type: ELawyersActionType.addLawyerModalOpen,
              payload: false,
            })
          }
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Lawyers };
