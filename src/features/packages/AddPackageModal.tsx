import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddPackageForm from './AddPackageForm';
import useAddNewPackageMutation from '../../hooks/mutations/packages/useAddNewPackageMutation';
import { usePackages } from '../../store/contexts/PackagesContext';
import { mapAddPackageFormToRequestData } from './helpers/packagesHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { EPackagesActionType } from '../../types/packagesTypes';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddPackageModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      addPackageForm,
      openSuccessSnackbar,
      openErrorSnackbar,
      addPackageModalOpen,
      editPackageModalOpen,
    },
    dispatch: updatePackagesState,
  } = usePackages();

  const {
    mutate: postNewPackage,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
    reset,
  } = useAddNewPackageMutation(onClose, updatePackagesState);

  React.useEffect(() => {
    if ((addPackageModalOpen || editPackageModalOpen) && isSuccess) reset();
  }, [addPackageModalOpen, editPackageModalOpen]);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewPackage')}
        children={<AddPackageForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewPackage(mapAddPackageFormToRequestData(addPackageForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updatePackagesState({
              type: EPackagesActionType.openSuccessSnackbar,
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

export default AddPackageModal;
