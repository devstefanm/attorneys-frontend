import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ExecutorsTable } from '../features/executors/ExecutorsTable';
import { useExecutors } from '../store/contexts/ExecutorsContext';
import AddExecutorModal from '../features/executors/AddExecutorModal';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EExecutorsActionType } from '../types/executorsTypes';
import { EditExecutorModal } from '../features/executors/EditExecutorModal';
import { ETransactionsActionType } from '../types/transactionsTypes';
import { useTransactions } from '../store/contexts/TransactionsContext';

type Props = IPagesProps & {};

const Executors = (_props: Props) => {
  const { t } = useTranslation();
  const {
    state: { addExecutorModalOpen, editExecutorModalOpen },
    dispatch: updateExecutorsState,
  } = useExecutors();

  const { dispatch: updateTransactionsState } = useTransactions();

  const handleAddExecutorModalClose = () => {
    updateExecutorsState({
      type: EExecutorsActionType.addExecutorModalOpen,
      payload: false,
    });
    updateExecutorsState({
      type: EExecutorsActionType.resetExecutorFormData,
    });
  };

  const handleEditExecutorModalClose = () => {
    updateExecutorsState({
      type: EExecutorsActionType.editExecutorModalOpen,
      payload: false,
    });
    updateExecutorsState({
      type: EExecutorsActionType.resetExecutorFormData,
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
          onClose={handleAddExecutorModalClose}
        />
        <EditExecutorModal
          open={editExecutorModalOpen}
          onClose={handleEditExecutorModalClose}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Executors };
