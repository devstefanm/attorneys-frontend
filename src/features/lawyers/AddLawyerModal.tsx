import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddLawyerForm from './AddLawyerForm';
import useAddNewLawyerMutation from '../../hooks/mutations/lawyers/useAddNewLawyerMutation';
import { useLawyers } from '../../store/contexts/LawyersContext';
import { mapAddLawyerFormToRequestData } from './helpers/lawyersHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddLawyerModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addLawyerForm },
    dispatch: updateLawyersState,
  } = useLawyers();

  const { mutate: postNewLawyer, isLoading } = useAddNewLawyerMutation(
    onClose,
    updateLawyersState,
  );

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewLawyer')}
        children={<AddLawyerForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewLawyer(mapAddLawyerFormToRequestData(addLawyerForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
    </ErrorBoundary>
  );
};

export default AddLawyerModal;
