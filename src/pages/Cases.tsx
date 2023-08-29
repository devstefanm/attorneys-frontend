import * as React from 'react';
import { IPagesProps } from '../libs/react-router-dom/routes';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CasesTable } from '../features/cases/CasesTable';
import { CasesStateProvider, useCases } from '../store/contexts/CasesContext';
import AddCaseModal from '../features/cases/AddCaseModal';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ETableActionType } from '../types/universalTypes';
import { CasesFilter } from '../features/cases/CasesFilter';

type Props = IPagesProps & {};

const Cases = (_props: Props) => {
  const { t } = useTranslation();
  const {
    state: { addCaseModalOpen },
    dispatch: updateCasesState,
  } = useCases();

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <CasesStateProvider>
          <Box className="my-2 flex justify-between">
            <CasesFilter />
            <Button
              onClick={() =>
                updateCasesState({
                  type: ETableActionType.addCaseModalOpen,
                  payload: !addCaseModalOpen,
                })
              }
            >
              {t('entities.addNewCase')}
            </Button>
          </Box>
          <CasesTable />
          <AddCaseModal
            open={addCaseModalOpen}
            onClose={() =>
              updateCasesState({
                type: ETableActionType.addCaseModalOpen,
                payload: false,
              })
            }
          />
        </CasesStateProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Cases };
