import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditSSNNumberMutation from '../../hooks/mutations/ssnNumbers/useEditSSNNumberMutation';
import { useSSNNumbers } from '../../store/contexts/SSNNumbersContext';
import { mapEditSSNNumberFormToRequestData } from './helpers/ssnNumbersHelpers';
import EditSSNNumberForm from './EditSSNNumberForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { ESSNNumbersActionType } from '../../types/ssnNumbersTypes';
import useDeleteSSNNumberMutation from '../../hooks/mutations/ssnNumbers/useDeleteSSNNumberMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditSSNNumberModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedSSNNumberFormData,
      editSSNNumberId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addSSNNumberModalOpen,
      editSSNNumberModalOpen,
    },
    dispatch: updateSSNNumbersState,
  } = useSSNNumbers();

  const onConfirmationDialogClose = () => {
    updateSSNNumbersState({
      type: ESSNNumbersActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editSSNNumber,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditSSNNumberMutation(
    onClose,
    updateSSNNumbersState,
    editSSNNumberId as number,
  );

  const {
    mutate: daleteSSNNumber,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteSSNNumberMutation(
    onConfirmationDialogClose,
    updateSSNNumbersState,
    editSSNNumberId as number,
  );

  React.useEffect(() => {
    if (addSSNNumberModalOpen || editSSNNumberModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addSSNNumberModalOpen, editSSNNumberModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editSSNNumber')}
        children={<EditSSNNumberForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editSSNNumber(
            mapEditSSNNumberFormToRequestData(editedSSNNumberFormData),
          )
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateSSNNumbersState({
            type: ESSNNumbersActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteSSNNumber"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteSSNNumber()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateSSNNumbersState({
              type: ESSNNumbersActionType.openSuccessSnackbar,
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
            updateSSNNumbersState({
              type: ESSNNumbersActionType.openSuccessSnackbar,
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
            updateSSNNumbersState({
              type: ESSNNumbersActionType.openErrorSnackbar,
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

export { EditSSNNumberModal };
