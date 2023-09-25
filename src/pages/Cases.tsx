import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CasesTable } from '../features/cases/CasesTable';
import { useCases } from '../store/contexts/CasesContext';
import { AddCaseModal } from '../features/cases/AddCaseModal';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CasesFilter } from '../features/cases/CasesFilter';
import { ECasesActionType } from '../types/casesTypes';
import { EditCaseModal } from '../features/cases/EditCaseModal';
import { CasesFilterByClient } from '../features/cases/CasesFilterByClient';
import { ExportCasesDialog } from '../features/cases/ExportCasesDialog';
import { ImportCasesDialog } from '../features/cases/ImportCasesDialog';

type Props = IPagesProps & {};

const Cases = (_props: Props) => {
  const { t } = useTranslation();
  const {
    state: {
      addCaseModalOpen,
      editCaseModalOpen,
      exportCasesDialogOpen,
      importCasesDialogOpen,
    },
    dispatch: updateCasesState,
  } = useCases();

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="my-2 flex justify-between">
          <Box className="grid grid-flow-col gap-2">
            <CasesFilter />
            <CasesFilterByClient />
          </Box>
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
        </Box>
        <CasesTable />
        <AddCaseModal
          open={addCaseModalOpen}
          onClose={() =>
            updateCasesState({
              type: ECasesActionType.addCaseModalOpen,
              payload: false,
            })
          }
        />
        <EditCaseModal
          open={editCaseModalOpen}
          onClose={() => {
            updateCasesState({
              type: ECasesActionType.editCaseModalOpen,
              payload: false,
            });
            updateCasesState({
              type: ECasesActionType.resetCaseFormData,
            });
          }}
        />
        {exportCasesDialogOpen ? (
          <ExportCasesDialog
            open={exportCasesDialogOpen}
            onClose={() => {
              updateCasesState({
                type: ECasesActionType.exportCasesDialogOpen,
                payload: false,
              });
              updateCasesState({
                type: ECasesActionType.downloadFile,
                payload: false,
              });
            }}
          />
        ) : (
          ''
        )}
        {importCasesDialogOpen ? (
          <ImportCasesDialog
            open={importCasesDialogOpen}
            onClose={() => {
              updateCasesState({
                type: ECasesActionType.importCasesDialogOpen,
                payload: false,
              });
              updateCasesState({
                type: ECasesActionType.resetCaseFormData,
              });
            }}
          />
        ) : (
          ''
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Cases };
