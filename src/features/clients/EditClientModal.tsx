import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditClientMutation from '../../hooks/mutations/clients/useEditClientMutation';
import { useClients } from '../../store/contexts/ClientsContext';
import { mapEditClientFormToRequestData } from './helpers/clientsHelpers';
import EditClientForm from './EditClientForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { EClientsActionType } from '../../types/clientsTypes';
import useDeleteClientMutation from '../../hooks/mutations/clients/useDeleteClientMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditClientModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedClientFormData,
      editClientId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addClientModalOpen,
      editClientModalOpen,
    },
    dispatch: updateClientsState,
  } = useClients();

  const onConfirmationDialogClose = () => {
    updateClientsState({
      type: EClientsActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editClient,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditClientMutation(
    onClose,
    updateClientsState,
    editClientId as number,
  );

  const {
    mutate: daleteClient,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteClientMutation(
    onConfirmationDialogClose,
    updateClientsState,
    editClientId as number,
  );

  React.useEffect(() => {
    if (addClientModalOpen || editClientModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addClientModalOpen, editClientModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editClient')}
        children={<EditClientForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editClient(mapEditClientFormToRequestData(editedClientFormData))
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateClientsState({
            type: EClientsActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteClient"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteClient()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateClientsState({
              type: EClientsActionType.openSuccessSnackbar,
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
            updateClientsState({
              type: EClientsActionType.openSuccessSnackbar,
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
            updateClientsState({
              type: EClientsActionType.openErrorSnackbar,
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

export { EditClientModal };
