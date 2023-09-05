import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddLawyerForm from './AddLawyerForm';
import useAddNewLawyerMutation from '../../hooks/mutations/lawyers/useAddNewLawyerMutation';
import { useLawyers } from '../../store/contexts/LawyersContext';
import { mapAddLawyerFormToRequestData } from './helpers/lawyersHelpers';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddLawyerModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    state: { addLawyerForm },
    dispatch: updateLawyersState,
  } = useLawyers();

  const {
    mutate: postNewLawyer,
    isLoading,
    isSuccess,
  } = useAddNewLawyerMutation(onClose, updateLawyersState);

  if (isSuccess) queryClient.invalidateQueries({ queryKey: ['lawyersList'] });

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
