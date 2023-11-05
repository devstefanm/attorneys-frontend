import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SSNNumbersTable } from '../features/ssnNumbers/SSNNumbersTable';
import { PackagesTable } from '../features/packages/PackagesTable';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSSNNumbers } from '../store/contexts/SSNNumbersContext';
import { usePackages } from '../store/contexts/PackagesContext';
import { ESSNNumbersActionType } from '../types/ssnNumbersTypes';
import { EPackagesActionType } from '../types/packagesTypes';
import AddSSNNumberModal from '../features/ssnNumbers/AddSSNNumberModal';
import AddPackageModal from '../features/packages/AddPackageModal';
import { EditPackageModal } from '../features/packages/EditPackageModal';
import { EditSSNNumberModal } from '../features/ssnNumbers/EditSSNNumberModal';
import { useTransactions } from '../store/contexts/TransactionsContext';
import { ETransactionsActionType } from '../types/transactionsTypes';

type Props = IPagesProps & {};

const SSNNumbersAndPackages = (_props: Props) => {
  const { t } = useTranslation();

  const {
    state: { addSSNNumberModalOpen, editSSNNumberModalOpen },
    dispatch: updateSSNNumbersState,
  } = useSSNNumbers();

  const {
    state: { addPackageModalOpen, editPackageModalOpen },
    dispatch: updatePackagesState,
  } = usePackages();

  const { dispatch: updateTransactionsState } = useTransactions();

  const handleAddSSNNumberModalClose = () => {
    updateSSNNumbersState({
      type: ESSNNumbersActionType.addSSNNumberModalOpen,
      payload: false,
    });
    updateSSNNumbersState({
      type: ESSNNumbersActionType.resetSSNNumberFormData,
    });
  };

  const handleEditSSNNumberModalClose = () => {
    updateSSNNumbersState({
      type: ESSNNumbersActionType.editSSNNumberModalOpen,
      payload: false,
    });
    updateSSNNumbersState({
      type: ESSNNumbersActionType.resetSSNNumberFormData,
    });
  };

  const handleAddPackageModalClose = () => {
    updatePackagesState({
      type: EPackagesActionType.addPackageModalOpen,
      payload: false,
    });
    updatePackagesState({
      type: EPackagesActionType.resetPackageFormData,
    });
  };

  const handleEditPackageModalClose = () => {
    updatePackagesState({
      type: EPackagesActionType.editPackageModalOpen,
      payload: false,
    });
    updatePackagesState({
      type: EPackagesActionType.resetPackageFormData,
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
                  updateSSNNumbersState({
                    type: ESSNNumbersActionType.addSSNNumberModalOpen,
                    payload: !addSSNNumberModalOpen,
                  })
                }
              >
                {t('entities.addNewSSNNumber')}
              </Button>
            </Box>
            <SSNNumbersTable />
          </Box>
          <Box className="w-full">
            <Box className="my-2 flex justify-end">
              <Button
                onClick={() =>
                  updatePackagesState({
                    type: EPackagesActionType.addPackageModalOpen,
                    payload: !addPackageModalOpen,
                  })
                }
              >
                {t('entities.addNewPackage')}
              </Button>
            </Box>
            <PackagesTable />
          </Box>
        </Box>
        <AddSSNNumberModal
          open={addSSNNumberModalOpen}
          onClose={handleAddSSNNumberModalClose}
        />
        <EditSSNNumberModal
          open={editSSNNumberModalOpen}
          onClose={handleEditSSNNumberModalClose}
        />
        <AddPackageModal
          open={addPackageModalOpen}
          onClose={handleAddPackageModalClose}
        />
        <EditPackageModal
          open={editPackageModalOpen}
          onClose={handleEditPackageModalClose}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { SSNNumbersAndPackages };
