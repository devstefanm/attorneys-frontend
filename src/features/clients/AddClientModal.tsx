import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddClientForm from './AddClientForm';
import useAddNewClientMutation from '../../hooks/mutations/clients/useAddNewClientMutation';
import { useClients } from '../../store/contexts/ClientsContext';
import { mapAddClientFormToRequestData } from './helpers/clientsHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddClientModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addClientForm },
    dispatch: updateClientsState,
  } = useClients();

  const { mutate: postNewClient, isLoading } = useAddNewClientMutation(
    onClose,
    updateClientsState,
  );

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewClient')}
        children={<AddClientForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewClient(mapAddClientFormToRequestData(addClientForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
    </ErrorBoundary>
  );
};

export default AddClientModal;
