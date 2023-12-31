import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddTransactionForm from './AddTransactionForm';
import useAddNewTransactionMutation from '../../hooks/mutations/transactions/useAddNewTransactionMutation';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import { mapAddTransactionFormToRequestData } from './helpers/transactionsHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { ETransactionsActionType } from '../../types/transactionsTypes';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddTransactionModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      addTransactionForm,
      openSuccessSnackbar,
      openErrorSnackbar,
      addTransactionModalOpen,
      editTransactionModalOpen,
      importTransactionsDialogOpen,
    },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const {
    mutate: postNewTransaction,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
    reset,
  } = useAddNewTransactionMutation(onClose, updateTransactionsState);

  React.useEffect(() => {
    if (
      (addTransactionModalOpen ||
        editTransactionModalOpen ||
        importTransactionsDialogOpen) &&
      isSuccess
    )
      reset();
  }, [
    addTransactionModalOpen,
    editTransactionModalOpen,
    importTransactionsDialogOpen,
  ]);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewTransaction')}
        children={<AddTransactionForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewTransaction(
            mapAddTransactionFormToRequestData(addTransactionForm),
          )
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateTransactionsState({
              type: ETransactionsActionType.openSuccessSnackbar,
              payload: false,
            })
          }
          severity="success"
          content={data?.data.message}
        />
      ) : (
        ''
      )}
      {isError && error?.response?.data?.message ? (
        <SnackbarNotification
          open={openErrorSnackbar}
          onClose={() =>
            updateTransactionsState({
              type: ETransactionsActionType.openErrorSnackbar,
              payload: false,
            })
          }
          severity="error"
          content={error?.response?.data?.message}
        />
      ) : (
        ''
      )}
    </ErrorBoundary>
  );
};

export default AddTransactionModal;
