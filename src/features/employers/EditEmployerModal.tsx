import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditEmployerMutation from '../../hooks/mutations/employers/useEditEmployerMutation';
import { useEmployers } from '../../store/contexts/EmployersContext';
import { mapEditEmployerFormToRequestData } from './helpers/employersHelpers';
import EditEmployerForm from './EditEmployerForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { EEmployersActionType } from '../../types/employersTypes';
import useDeleteEmployerMutation from '../../hooks/mutations/employers/useDeleteEmployerMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditEmployerModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedEmployerFormData,
      editEmployerId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addEmployerModalOpen,
      editEmployerModalOpen,
    },
    dispatch: updateEmployersState,
  } = useEmployers();

  const onConfirmationDialogClose = () => {
    updateEmployersState({
      type: EEmployersActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editEmployer,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditEmployerMutation(
    onClose,
    updateEmployersState,
    editEmployerId as number,
  );

  const {
    mutate: daleteEmployer,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteEmployerMutation(
    onConfirmationDialogClose,
    updateEmployersState,
    editEmployerId as number,
  );

  React.useEffect(() => {
    if (addEmployerModalOpen || editEmployerModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addEmployerModalOpen, editEmployerModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editEmployer')}
        children={<EditEmployerForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editEmployer(mapEditEmployerFormToRequestData(editedEmployerFormData))
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateEmployersState({
            type: EEmployersActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteEmployer"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteEmployer()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateEmployersState({
              type: EEmployersActionType.openSuccessSnackbar,
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
            updateEmployersState({
              type: EEmployersActionType.openSuccessSnackbar,
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
            updateEmployersState({
              type: EEmployersActionType.openErrorSnackbar,
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

export { EditEmployerModal };
