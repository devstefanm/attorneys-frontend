import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditCourtMutation from '../../hooks/mutations/courts/useEditCourtMutation';
import { useCourts } from '../../store/contexts/CourtsContext';
import { mapEditCourtFormToRequestData } from './helpers/courtsHelpers';
import EditCourtForm from './EditCourtForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { ECourtsActionType } from '../../types/courtsTypes';
import useDeleteCourtMutation from '../../hooks/mutations/courts/useDeleteCourtMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditCourtModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedCourtFormData,
      editCourtId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addCourtModalOpen,
      editCourtModalOpen,
    },
    dispatch: updateCourtsState,
  } = useCourts();

  const onConfirmationDialogClose = () => {
    updateCourtsState({
      type: ECourtsActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editCourt,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditCourtMutation(onClose, updateCourtsState, editCourtId as number);

  const {
    mutate: daleteCourt,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteCourtMutation(
    onConfirmationDialogClose,
    updateCourtsState,
    editCourtId as number,
  );

  React.useEffect(() => {
    if (addCourtModalOpen || editCourtModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addCourtModalOpen, editCourtModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editCourt')}
        children={<EditCourtForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editCourt(mapEditCourtFormToRequestData(editedCourtFormData))
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateCourtsState({
            type: ECourtsActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteCourt"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteCourt()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateCourtsState({
              type: ECourtsActionType.openSuccessSnackbar,
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
            updateCourtsState({
              type: ECourtsActionType.openSuccessSnackbar,
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
            updateCourtsState({
              type: ECourtsActionType.openErrorSnackbar,
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

export { EditCourtModal };
