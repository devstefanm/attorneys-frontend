import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditTransactionMutation from '../../hooks/mutations/transactions/useEditTransactionMutation';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import { mapEditTransactionFormToRequestData } from './helpers/transactionsHelpers';
import EditTransactionForm from './EditTransactionForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { ETransactionsActionType } from '../../types/transactionsTypes';
import useDeleteTransactionMutation from '../../hooks/mutations/transactions/useDeleteTransactionMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';
import useValidateUser from '../../hooks/utils/useValidateUser';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditTransactionModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const { role } = useValidateUser();

  const {
    state: {
      editedTransactionFormData,
      editTransactionId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addTransactionModalOpen,
      editTransactionModalOpen,
      importTransactionsDialogOpen,
    },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const onConfirmationDialogClose = () => {
    updateTransactionsState({
      type: ETransactionsActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editTransaction,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditTransactionMutation(
    onClose,
    updateTransactionsState,
    editTransactionId as number,
  );

  const {
    mutate: daleteTransaction,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteTransactionMutation(
    onConfirmationDialogClose,
    updateTransactionsState,
    editTransactionId as number,
  );

  React.useEffect(() => {
    if (
      addTransactionModalOpen ||
      editTransactionModalOpen ||
      importTransactionsDialogOpen
    ) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [
    addTransactionModalOpen,
    editTransactionModalOpen,
    importTransactionsDialogOpen,
  ]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={
          role?.toLowerCase() !== 'visitor'
            ? t('entities.editTransaction')
            : t('entities.viewTransaction')
        }
        children={<EditTransactionForm />}
        onClose={onClose}
        hasActionButton={role?.toLowerCase() !== 'visitor'}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editTransaction(
            mapEditTransactionFormToRequestData(editedTransactionFormData),
          )
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={role?.toLowerCase() !== 'visitor'}
        onExtraButtonClick={() =>
          updateTransactionsState({
            type: ETransactionsActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteTransaction"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteTransaction()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateTransactionsState({
              type: ETransactionsActionType.openSuccessSnackbar,
              payload: false,
            })
          }
          severity="success"
          content={editData?.data.message}
        />
      ) : (
        ''
      )}
      {isDeleteSuccess && deleteData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateTransactionsState({
              type: ETransactionsActionType.openSuccessSnackbar,
              payload: false,
            })
          }
          severity="success"
          content={deleteData?.data.message}
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

export { EditTransactionModal };
