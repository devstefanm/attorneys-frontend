import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddExecutorForm from './AddExecutorForm';
import useAddNewExecutorMutation from '../../hooks/mutations/executors/useAddNewExecutorMutation';
import { useExecutors } from '../../store/contexts/ExecutorsContext';
import { mapAddExecutorFormToRequestData } from './helpers/executorsHelpers';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddExecutorModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    state: { addExecutorForm },
    dispatch: updateExecutorsState,
  } = useExecutors();

  const {
    mutate: postNewExecutor,
    isLoading,
    isSuccess,
  } = useAddNewExecutorMutation(onClose, updateExecutorsState);

  if (isSuccess) queryClient.invalidateQueries({ queryKey: ['executorsList'] });

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewExecutor')}
        children={<AddExecutorForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewExecutor(mapAddExecutorFormToRequestData(addExecutorForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
    </ErrorBoundary>
  );
};

export default AddExecutorModal;
