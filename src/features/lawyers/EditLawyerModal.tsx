import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditLawyerMutation from '../../hooks/mutations/lawyers/useEditLawyerMutation';
import { useLawyers } from '../../store/contexts/LawyersContext';
import { mapEditLawyerFormToRequestData } from './helpers/lawyersHelpers';
import EditLawyerForm from './EditLawyerForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { ELawyersActionType } from '../../types/lawyersTypes';
import useDeleteLawyerMutation from '../../hooks/mutations/lawyers/useDeleteLawyerMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditLawyerModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedLawyerFormData,
      editLawyerId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addLawyerModalOpen,
      editLawyerModalOpen,
    },
    dispatch: updateLawyersState,
  } = useLawyers();

  const onConfirmationDialogClose = () => {
    updateLawyersState({
      type: ELawyersActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editLawyer,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditLawyerMutation(
    onClose,
    updateLawyersState,
    editLawyerId as number,
  );

  const {
    mutate: daleteLawyer,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteLawyerMutation(
    onConfirmationDialogClose,
    updateLawyersState,
    editLawyerId as number,
  );

  React.useEffect(() => {
    if (addLawyerModalOpen || editLawyerModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addLawyerModalOpen, editLawyerModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editLawyer')}
        children={<EditLawyerForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editLawyer(mapEditLawyerFormToRequestData(editedLawyerFormData))
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateLawyersState({
            type: ELawyersActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteLawyer"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteLawyer()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateLawyersState({
              type: ELawyersActionType.openSuccessSnackbar,
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
            updateLawyersState({
              type: ELawyersActionType.openSuccessSnackbar,
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
            updateLawyersState({
              type: ELawyersActionType.openErrorSnackbar,
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

export { EditLawyerModal };
