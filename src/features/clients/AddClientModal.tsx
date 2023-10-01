import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddClientForm from './AddClientForm';
import useAddNewClientMutation from '../../hooks/mutations/clients/useAddNewClientMutation';
import { useClients } from '../../store/contexts/ClientsContext';
import { mapAddClientFormToRequestData } from './helpers/clientsHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { EClientsActionType } from '../../types/clientsTypes';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddClientModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      addClientForm,
      openSuccessSnackbar,
      openErrorSnackbar,
      addClientModalOpen,
      editClientModalOpen,
    },
    dispatch: updateClientsState,
  } = useClients();

  const {
    mutate: postNewClient,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
    reset,
  } = useAddNewClientMutation(onClose, updateClientsState);

  React.useEffect(() => {
    if ((addClientModalOpen || editClientModalOpen) && isSuccess) reset();
  }, [addClientModalOpen, editClientModalOpen]);

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
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateClientsState({
              type: EClientsActionType.openSuccessSnackbar,
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
            updateClientsState({
              type: EClientsActionType.openErrorSnackbar,
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

export default AddClientModal;
