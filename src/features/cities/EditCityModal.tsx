import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditCityMutation from '../../hooks/mutations/cities/useEditCityMutation';
import { useCities } from '../../store/contexts/CitiesContext';
import { mapEditCityFormToRequestData } from './helpers/citiesHelpers';
import EditCityForm from './EditCityForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { ECitiesActionType } from '../../types/citiesTypes';
import useDeleteCityMutation from '../../hooks/mutations/cities/useDeleteCityMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditCityModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedCityFormData,
      editCityId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addCityModalOpen,
      editCityModalOpen,
    },
    dispatch: updateCitiesState,
  } = useCities();

  const onConfirmationDialogClose = () => {
    updateCitiesState({
      type: ECitiesActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editCity,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditCityMutation(onClose, updateCitiesState, editCityId as number);

  const {
    mutate: daleteCity,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeleteCityMutation(
    onConfirmationDialogClose,
    updateCitiesState,
    editCityId as number,
  );

  React.useEffect(() => {
    if (addCityModalOpen || editCityModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addCityModalOpen, editCityModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editCity')}
        children={<EditCityForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editCity(mapEditCityFormToRequestData(editedCityFormData))
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateCitiesState({
            type: ECitiesActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteCity"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteCity()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateCitiesState({
              type: ECitiesActionType.openSuccessSnackbar,
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
            updateCitiesState({
              type: ECitiesActionType.openSuccessSnackbar,
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
            updateCitiesState({
              type: ECitiesActionType.openErrorSnackbar,
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

export { EditCityModal };
