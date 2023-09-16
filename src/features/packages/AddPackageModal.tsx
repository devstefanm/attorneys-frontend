import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddPackageForm from './AddPackageForm';
import useAddNewPackageMutation from '../../hooks/mutations/packages/useAddNewPackageMutation';
import { usePackages } from '../../store/contexts/PackagesContext';
import { mapAddPackageFormToRequestData } from './helpers/packagesHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddPackageModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addPackageForm },
    dispatch: updatePackagesState,
  } = usePackages();

  const { mutate: postNewPackage, isLoading } = useAddNewPackageMutation(
    onClose,
    updatePackagesState,
  );

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
    </ErrorBoundary>
  );
};

export default AddPackageModal;
