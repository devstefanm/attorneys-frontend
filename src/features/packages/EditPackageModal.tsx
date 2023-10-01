import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditPackageMutation from '../../hooks/mutations/packages/useEditPackageMutation';
import { usePackages } from '../../store/contexts/PackagesContext';
import { mapEditPackageFormToRequestData } from './helpers/packagesHelpers';
import EditPackageForm from './EditPackageForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { EPackagesActionType } from '../../types/packagesTypes';
import useDeletePackageMutation from '../../hooks/mutations/packages/useDeletePackageMutation';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditPackageModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      editedPackageFormData,
      editPackageId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
      addPackageModalOpen,
      editPackageModalOpen,
    },
    dispatch: updatePackagesState,
  } = usePackages();

  const onConfirmationDialogClose = () => {
    updatePackagesState({
      type: EPackagesActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    mutate: editPackage,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: editReset,
  } = useEditPackageMutation(
    onClose,
    updatePackagesState,
    editPackageId as number,
  );

  const {
    mutate: daletePackage,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    reset: deleteReset,
  } = useDeletePackageMutation(
    onConfirmationDialogClose,
    updatePackagesState,
    editPackageId as number,
  );

  React.useEffect(() => {
    if (addPackageModalOpen || editPackageModalOpen) {
      if (isEditSuccess) editReset();
      if (isDeleteSuccess) deleteReset();
    }
  }, [addPackageModalOpen, editPackageModalOpen]);

  const isError = isEditError || isDeleteError;
  const error = editError || deleteError;

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editPackage')}
        children={<EditPackageForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editPackage(mapEditPackageFormToRequestData(editedPackageFormData))
        }
        isLoading={isEditLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updatePackagesState({
            type: EPackagesActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deletePackage"
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daletePackage()}
      />
      {isEditSuccess && editData?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updatePackagesState({
              type: EPackagesActionType.openSuccessSnackbar,
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
            updatePackagesState({
              type: EPackagesActionType.openSuccessSnackbar,
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
            updatePackagesState({
              type: EPackagesActionType.openErrorSnackbar,
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

export { EditPackageModal };
