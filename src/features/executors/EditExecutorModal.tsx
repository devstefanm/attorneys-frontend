import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditExecutorMutation from '../../hooks/mutations/executors/useEditExecutorMutation';
import { useExecutors } from '../../store/contexts/ExecutorsContext';
import { mapEditExecutorFormToRequestData } from './helpers/executorsHelpers';
import EditExecutorForm from './EditExecutorForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { EExecutorsActionType } from '../../types/executorsTypes';
import useDeleteExecutorMutation from '../../hooks/mutations/executors/useDeleteExecutorMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditExecutorModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedExecutorFormData,
      editExecutorId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addExecutorModalOpen,
      editExecutorModalOpen,
    },
    dispatch: updateExecutorsState,
  } = useExecutors();

  const onConfirmationDialogClose = () => {
    updateExecutorsState({
      type: EExecutorsActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editExecutor,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditExecutorMutation(
    onClose,
    updateExecutorsState,
    editExecutorId as number,
  );

  const {
    mutate: daleteExecutor,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteExecutorMutation(
    onConfirmationDialogClose,
    updateExecutorsState,
    editExecutorId as number,
  );

  React.useEffect(() => {
    if (addExecutorModalOpen || editExecutorModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addExecutorModalOpen, editExecutorModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editExecutor')}
        children={<EditExecutorForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editExecutor(mapEditExecutorFormToRequestData(editedExecutorFormData))
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateExecutorsState({
            type: EExecutorsActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteExecutor"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteExecutor()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateExecutorsState({
              type: EExecutorsActionType.openSuccessSnackbar,
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
            updateExecutorsState({
              type: EExecutorsActionType.openSuccessSnackbar,
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
            updateExecutorsState({
              type: EExecutorsActionType.openErrorSnackbar,
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

export { EditExecutorModal };
