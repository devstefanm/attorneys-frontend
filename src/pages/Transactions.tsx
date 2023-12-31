import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TransactionsTable } from '../features/transactions/TransactionsTable';
import { useTransactions } from '../store/contexts/TransactionsContext';
import AddTransactionModal from '../features/transactions/AddTransactionModal';
import { ETransactionsActionType } from '../types/transactionsTypes';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TransactionsFilter } from '../features/transactions/TransactionsFilter';
import { EditTransactionModal } from '../features/transactions/EditTransactionModal';
import { ImportTransactionsDialog } from '../features/transactions/ImportTransactionsDialog';
import { TransactionsDateFilter } from '../features/transactions/TransactionsDateFilter';
import { ExportTransactionsDialog } from '../features/transactions/ExportTransactionsDialog';
import useValidateUser from '../hooks/utils/useValidateUser';

type Props = IPagesProps & {};

const Transactions = (_props: Props) => {
  const { t } = useTranslation();
  const { role } = useValidateUser();

  const {
    state: {
      addTransactionModalOpen,
      editTransactionModalOpen,
      totalAmount,
      importTransactionsDialogOpen,
      exportTransactionsDialogOpen,
    },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const handleAddTransactionModalClose = () => {
    updateTransactionsState({
      type: ETransactionsActionType.addTransactionModalOpen,
      payload: false,
    });
    updateTransactionsState({
      type: ETransactionsActionType.resetTransactionFormData,
    });
  };

  const handleEditTransactionModalClose = () => {
    updateTransactionsState({
      type: ETransactionsActionType.editTransactionModalOpen,
      payload: false,
    });
    updateTransactionsState({
      type: ETransactionsActionType.resetTransactionFormData,
    });
  };

  const handleImportTransactionsDialogClose = () => {
    updateTransactionsState({
      type: ETransactionsActionType.importTransactionsDialogOpen,
      payload: false,
    });
    updateTransactionsState({
      type: ETransactionsActionType.resetTransactionFormData,
    });
  };

  const handleExportTransactionsDialogClose = () => {
    updateTransactionsState({
      type: ETransactionsActionType.exportTransactionsDialogOpen,
      payload: false,
    });
    updateTransactionsState({
      type: ETransactionsActionType.resetTransactionFormData,
    });
  };

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="my-2 flex justify-between items-baseline">
          <>
            <Box className="grid grid-flow-col gap-2">
              <TransactionsFilter />
              <TransactionsDateFilter />
            </Box>
            {totalAmount ? (
              <span className="text-sm">
                {t('entities.totalAmount')}: {totalAmount}
              </span>
            ) : (
              ''
            )}
          </>
          {role?.toLowerCase() !== 'visitor' ? (
            <Box>
              <Button
                color="success"
                onClick={() =>
                  updateTransactionsState({
                    type: ETransactionsActionType.importTransactionsDialogOpen,
                    payload: !importTransactionsDialogOpen,
                  })
                }
              >
                {t('entities.importTransactions')}
              </Button>
              <Button
                color="info"
                onClick={() =>
                  updateTransactionsState({
                    type: ETransactionsActionType.exportTransactionsDialogOpen,
                    payload: !exportTransactionsDialogOpen,
                  })
                }
              >
                {t('entities.exportTransactions')}
              </Button>
              <Button
                onClick={() =>
                  updateTransactionsState({
                    type: ETransactionsActionType.addTransactionModalOpen,
                    payload: !addTransactionModalOpen,
                  })
                }
              >
                {t('entities.addNewTransaction')}
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Box>
        <TransactionsTable />
        <AddTransactionModal
          open={addTransactionModalOpen}
          onClose={handleAddTransactionModalClose}
        />
        <EditTransactionModal
          open={editTransactionModalOpen}
          onClose={handleEditTransactionModalClose}
        />
        {importTransactionsDialogOpen ? (
          <ImportTransactionsDialog
            open={importTransactionsDialogOpen}
            onClose={handleImportTransactionsDialogClose}
          />
        ) : (
          ''
        )}
        {exportTransactionsDialogOpen ? (
          <ExportTransactionsDialog
            open={exportTransactionsDialogOpen}
            onClose={handleExportTransactionsDialogClose}
          />
        ) : (
          ''
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Transactions };
