import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ClientsTable } from '../features/clients/ClientsTable';
import { EmployersTable } from '../features/employers/EmployersTable';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useClients } from '../store/contexts/ClientsContext';
import { useEmployers } from '../store/contexts/EmployersContext';
import { EClientsActionType } from '../types/clientsTypes';
import { EEmployersActionType } from '../types/employersTypes';
import AddClientModal from '../features/clients/AddClientModal';
import AddEmployerModal from '../features/employers/AddEmployerModal';
import { EditClientModal } from '../features/clients/EditClientModal';
import { EditEmployerModal } from '../features/employers/EditEmployerModal';
import { useTransactions } from '../store/contexts/TransactionsContext';
import { ETransactionsActionType } from '../types/transactionsTypes';

type Props = IPagesProps & {};

const ClientsAndEmployers = (_props: Props) => {
  const { t } = useTranslation();

  const {
    state: { addClientModalOpen, editClientModalOpen },
    dispatch: updateClientsState,
  } = useClients();

  const {
    state: { addEmployerModalOpen, editEmployerModalOpen },
    dispatch: updateEmployersState,
  } = useEmployers();

  const { dispatch: updateTransactionsState } = useTransactions();

  const handleAddClientModalClose = () => {
    updateClientsState({
      type: EClientsActionType.addClientModalOpen,
      payload: false,
    });
    updateClientsState({
      type: EClientsActionType.resetClientFormData,
    });
  };

  const handleEditClientModalClose = () => {
    updateClientsState({
      type: EClientsActionType.editClientModalOpen,
      payload: false,
    });
    updateClientsState({
      type: EClientsActionType.resetClientFormData,
    });
  };

  const handleAddEmployerModalClose = () => {
    updateEmployersState({
      type: EEmployersActionType.addEmployerModalOpen,
      payload: false,
    });
    updateEmployersState({
      type: EEmployersActionType.resetEmployerFormData,
    });
  };

  const handleEditEmployerModalClose = () => {
    updateEmployersState({
      type: EEmployersActionType.editEmployerModalOpen,
      payload: false,
    });
    updateEmployersState({
      type: EEmployersActionType.resetEmployerFormData,
    });
  };

  React.useEffect(() => {
    updateTransactionsState({
      type: ETransactionsActionType.resetTransactionStates,
    });
  }, []);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="flex flex-col lg:flex-row gap-4">
          <Box className="w-full">
            <Box className="my-2 flex justify-end">
              <Button
                onClick={() =>
                  updateClientsState({
                    type: EClientsActionType.addClientModalOpen,
                    payload: !addClientModalOpen,
                  })
                }
              >
                {t('entities.addNewClient')}
              </Button>
            </Box>
            <ClientsTable />
          </Box>
          <Box className="w-full">
            <Box className="my-2 flex justify-end">
              <Button
                onClick={() =>
                  updateEmployersState({
                    type: EEmployersActionType.addEmployerModalOpen,
                    payload: !addEmployerModalOpen,
                  })
                }
              >
                {t('entities.addNewEmployer')}
              </Button>
            </Box>
            <EmployersTable />
          </Box>
        </Box>
        <AddClientModal
          open={addClientModalOpen}
          onClose={handleAddClientModalClose}
        />
        <EditClientModal
          open={editClientModalOpen}
          onClose={handleEditClientModalClose}
        />
        <AddEmployerModal
          open={addEmployerModalOpen}
          onClose={handleAddEmployerModalClose}
        />
        <EditEmployerModal
          open={editEmployerModalOpen}
          onClose={handleEditEmployerModalClose}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { ClientsAndEmployers };
