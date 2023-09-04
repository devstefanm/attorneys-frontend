import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import useAddNewTransactionMutation from '../../hooks/mutations/transactions/useAddNewTransactionMutation';
import AddTransactionForm from './AddTransactionForm';
import { mapAddTransactionFormToRequestData } from './helpers/transactionsHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddTransactionModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    state: { addTransactionForm },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const {
    mutate: postNewTransaction,
    isLoading,
    isSuccess,
  } = useAddNewTransactionMutation(onClose, updateTransactionsState);

  if (isSuccess)
    queryClient.invalidateQueries({ queryKey: ['transactionsList'] });

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewTransaction')}
        children={<AddTransactionForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewTransaction(
            mapAddTransactionFormToRequestData(addTransactionForm),
          )
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
    </ErrorBoundary>
  );
};

export default AddTransactionModal;
