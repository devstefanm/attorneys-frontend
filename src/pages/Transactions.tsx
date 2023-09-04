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

type Props = IPagesProps & {};

const Transactions = (_props: Props) => {
  const { t } = useTranslation();
  const {
    state: { addTransactionModalOpen },
    dispatch: updateTransactionsState,
  } = useTransactions();

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="my-2 flex justify-between">
          <TransactionsFilter />
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
        <TransactionsTable />
        <AddTransactionModal
          open={addTransactionModalOpen}
          onClose={() =>
            updateTransactionsState({
              type: ETransactionsActionType.addTransactionModalOpen,
              payload: false,
            })
          }
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Transactions };
