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

type Props = IPagesProps & {};

const SSNNumbersAndPackages = (_props: Props) => {
  const { t } = useTranslation();

  const {
    state: { addSSNNumberModalOpen },
    dispatch: updateSSNNumbersState,
  } = useSSNNumbers();

  const {
    state: { addPackageModalOpen },
    dispatch: updatePackagesState,
  } = usePackages();

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
          onClose={() =>
            updateSSNNumbersState({
              type: ESSNNumbersActionType.addSSNNumberModalOpen,
              payload: false,
            })
          }
        />
        <AddPackageModal
          open={addPackageModalOpen}
          onClose={() =>
            updatePackagesState({
              type: EPackagesActionType.addPackageModalOpen,
              payload: false,
            })
          }
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { SSNNumbersAndPackages };
