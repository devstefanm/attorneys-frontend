import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ExecutorsTable } from '../features/executors/ExecutorsTable';
import { useExecutors } from '../store/contexts/ExecutorsContext';
import AddExecutorModal from '../features/executors/AddExecutorModal';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EExecutorsActionType } from '../types/executorsTypes';

type Props = IPagesProps & {};

const Executors = (_props: Props) => {
  const { t } = useTranslation();
  const {
    state: { addExecutorModalOpen },
    dispatch: updateExecutorsState,
  } = useExecutors();

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="my-2 flex justify-end">
          <Button
            onClick={() =>
              updateExecutorsState({
                type: EExecutorsActionType.addExecutorModalOpen,
                payload: !addExecutorModalOpen,
              })
            }
          >
            {t('entities.addNewExecutor')}
          </Button>
        </Box>
        <ExecutorsTable />
        <AddExecutorModal
          open={addExecutorModalOpen}
          onClose={() =>
            updateExecutorsState({
              type: EExecutorsActionType.addExecutorModalOpen,
              payload: false,
            })
          }
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Executors };
