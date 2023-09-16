import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddEmployerForm from './AddEmployerForm';
import useAddNewEmployerMutation from '../../hooks/mutations/employers/useAddNewEmployerMutation';
import { useEmployers } from '../../store/contexts/EmployersContext';
import { mapAddEmployerFormToRequestData } from './helpers/employersHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddEmployerModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addEmployerForm },
    dispatch: updateEmployersState,
  } = useEmployers();

  const { mutate: postNewEmployer, isLoading } = useAddNewEmployerMutation(
    onClose,
    updateEmployersState,
  );

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewEmployer')}
        children={<AddEmployerForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewEmployer(mapAddEmployerFormToRequestData(addEmployerForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
    </ErrorBoundary>
  );
};

export default AddEmployerModal;
