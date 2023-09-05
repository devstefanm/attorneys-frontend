import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddSSNNumberForm from './AddSSNNumberForm';
import useAddNewSSNNumberMutation from '../../hooks/mutations/ssnNumbers/useAddNewSSNNumberMutation';
import { useSSNNumbers } from '../../store/contexts/SSNNumbersContext';
import { mapAddSSNNumberFormToRequestData } from './helpers/ssnNumbersHelpers';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddSSNNumberModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    state: { addSSNNumberForm },
    dispatch: updateSSNNumbersState,
  } = useSSNNumbers();

  const {
    mutate: postNewSSNNumber,
    isLoading,
    isSuccess,
  } = useAddNewSSNNumberMutation(onClose, updateSSNNumbersState);

  if (isSuccess)
    queryClient.invalidateQueries({ queryKey: ['ssnNumbersList'] });

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewSSNNumber')}
        children={<AddSSNNumberForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewSSNNumber(mapAddSSNNumberFormToRequestData(addSSNNumberForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
    </ErrorBoundary>
  );
};

export default AddSSNNumberModal;
