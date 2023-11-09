import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CasesTable } from '../features/cases/CasesTable';
import { useCases } from '../store/contexts/CasesContext';
import { AddCaseModal } from '../features/cases/AddCaseModal';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CasesFilter } from '../features/cases/CasesFilter';
import { ECasesActionType } from '../types/casesTypes';
import { EditCaseModal } from '../features/cases/EditCaseModal';
import { CasesFilterByClient } from '../features/cases/CasesFilterByClient';
import { ExportCasesDialog } from '../features/cases/ExportCasesDialog';
import { ImportCasesDialog } from '../features/cases/ImportCasesDialog';
import { useTransactions } from '../store/contexts/TransactionsContext';
import { ETransactionsActionType } from '../types/transactionsTypes';
import { CaseCategoryFilter } from '../features/cases/CaseCategoryFilter';
import useValidateUser from '../hooks/utils/useValidateUser';

type Props = IPagesProps & {};

const Cases = (_props: Props) => {
  const { t } = useTranslation();
  const { role } = useValidateUser();

  const {
    state: {
      addCaseModalOpen,
      editCaseModalOpen,
      exportCasesDialogOpen,
      importCasesDialogOpen,
      hasObjection,
    },
    dispatch: updateCasesState,
  } = useCases();

  const { dispatch: updateTransactionsState } = useTransactions();

  const handleAddCaseModalClose = () => {
    updateCasesState({
      type: ECasesActionType.addCaseModalOpen,
      payload: false,
    });
    updateCasesState({
      type: ECasesActionType.resetCaseFormData,
    });
  };

  const handleEditCaseModalClose = () => {
    updateCasesState({
      type: ECasesActionType.editCaseModalOpen,
      payload: false,
    });
    updateCasesState({
      type: ECasesActionType.resetCaseFormData,
    });
  };

  const handleExportCasesDialogClose = () => {
    updateCasesState({
      type: ECasesActionType.exportCasesDialogOpen,
      payload: false,
    });
    updateCasesState({
      type: ECasesActionType.downloadFile,
      payload: false,
    });
  };

  const handleImportCasesDialogClose = () => {
    updateCasesState({
      type: ECasesActionType.importCasesDialogOpen,
      payload: false,
    });
    updateCasesState({
      type: ECasesActionType.resetCaseFormData,
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
        <Box className="my-2 flex justify-between">
          <Box className="grid grid-flow-col gap-2">
            <CasesFilter />
            <CasesFilterByClient />
            <CaseCategoryFilter />
            <FormControlLabel
              className="ml-2"
              control={
                <Checkbox
                  size="small"
                  // @ts-ignore
                  checked={hasObjection}
                  onChange={(_event, checked) =>
                    updateCasesState({
                      type: ECasesActionType.hasObjection,
                      payload: checked,
                    })
                  }
                />
              }
              label={t(`entities.hasObjectionOnly`)}
            />
          </Box>
          {role?.toLowerCase() !== 'visitor' ? (
            <Box>
              <Button
                color="success"
                onClick={() =>
                  updateCasesState({
                    type: ECasesActionType.importCasesDialogOpen,
                    payload: !importCasesDialogOpen,
                  })
                }
              >
                {t('entities.importCases')}
              </Button>
              <Button
                color="info"
                onClick={() =>
                  updateCasesState({
                    type: ECasesActionType.exportCasesDialogOpen,
                    payload: !exportCasesDialogOpen,
                  })
                }
              >
                {t('entities.exportCases')}
              </Button>
              <Button
                onClick={() =>
                  updateCasesState({
                    type: ECasesActionType.addCaseModalOpen,
                    payload: !addCaseModalOpen,
                  })
                }
              >
                {t('entities.addNewCase')}
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Box>
        <CasesTable />
        <AddCaseModal
          open={addCaseModalOpen}
          onClose={handleAddCaseModalClose}
        />
        <EditCaseModal
          open={editCaseModalOpen}
          onClose={handleEditCaseModalClose}
        />
        {exportCasesDialogOpen ? (
          <ExportCasesDialog
            open={exportCasesDialogOpen}
            onClose={handleExportCasesDialogClose}
          />
        ) : (
          ''
        )}
        {importCasesDialogOpen ? (
          <ImportCasesDialog
            open={importCasesDialogOpen}
            onClose={handleImportCasesDialogClose}
          />
        ) : (
          ''
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Cases };
