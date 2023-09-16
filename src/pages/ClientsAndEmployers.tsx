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

type Props = IPagesProps & {};

const ClientsAndEmployers = (_props: Props) => {
  const { t } = useTranslation();

  const {
    state: { addClientModalOpen },
    dispatch: updateClientsState,
  } = useClients();

  const {
    state: { addEmployerModalOpen },
    dispatch: updateEmployersState,
  } = useEmployers();

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
          onClose={() =>
            updateClientsState({
              type: EClientsActionType.addClientModalOpen,
              payload: false,
            })
          }
        />
        <AddEmployerModal
          open={addEmployerModalOpen}
          onClose={() =>
            updateEmployersState({
              type: EEmployersActionType.addEmployerModalOpen,
              payload: false,
            })
          }
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { ClientsAndEmployers };
