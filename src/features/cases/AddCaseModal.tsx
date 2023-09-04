import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddCaseForm from './AddCaseForm';
import useAddNewCaseMutation from '../../hooks/mutations/cases/useAddNewCaseMutation';
import { useCases } from '../../store/contexts/CasesContext';
import { mapAddCaseFormToRequestData } from './helpers/casesHelpers';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCaseModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    state: { addCaseForm },
    dispatch: updateCasesState,
  } = useCases();

  const {
    mutate: postNewCase,
    isLoading,
    isSuccess,
  } = useAddNewCaseMutation(onClose, updateCasesState);

  if (isSuccess) queryClient.invalidateQueries({ queryKey: ['casesList'] });

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewCase')}
        children={<AddCaseForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() => postNewCase(mapAddCaseFormToRequestData(addCaseForm))}
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
    </ErrorBoundary>
  );
};

export default AddCaseModal;
