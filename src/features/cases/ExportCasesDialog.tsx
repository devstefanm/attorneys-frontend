import * as React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ExportDialog } from '../../components/ExportDialog';
import { useCases } from '../../store/contexts/CasesContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { ExportButton } from '../../components/ExportButton';
import { useTranslation } from 'react-i18next';
import { ECasesActionType } from '../../types/casesTypes';
import useExportCasesListMutation from '../../hooks/mutations/cases/useExportCasesListMutation';
import moment from 'moment';
import { ExportCasesChecklist } from './ExportCasesChecklist';
import { mapChecklistTrueFieldsToReqProps } from './helpers/casesHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ExportCasesDialog = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const {
    state: {
      searchable,
      filterable,
      filterableByClient,
      downloadFile,
      exportFileType,
      casesExportChecklistValues,
      openSuccessSnackbar,
      openErrorSnackbar,
    },
    dispatch: updateCasesState,
  } = useCases();

  const searchParams = searchable.reduce((accumulator, search) => {
    const queryParams = mapSearchToQueryParam(search);
    return { ...accumulator, ...queryParams };
  }, {});

  const {
    data,
    isLoading,
    mutateAsync: exportFile,
    error,
    isSuccess,
    isError,
  } = useExportCasesListMutation(updateCasesState);

  React.useEffect(() => {
    if (!isLoading && data) {
      const url = window.URL.createObjectURL(data as Blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${t('entities.cases')} - ${moment().format(
        'YYYY.MM.DD HH-mm',
      )}${exportFileType === 'excel' ? '.xlsx' : '.csv'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      if (isSuccess) {
        updateCasesState({
          type: ECasesActionType.openSuccessSnackbar,
          payload: true,
        });

        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  }, [isLoading, data]);

  return (
    <ErrorBoundary>
      <ExportDialog
        title={'entities.exportCases'}
        open={open}
        onClose={onClose}
        exportChecklist={<ExportCasesChecklist />}
        exportCSVButton={
          <ExportButton
            text={'exportCSV'}
            isLoading={isLoading}
            disabled={
              mapChecklistTrueFieldsToReqProps(casesExportChecklistValues)
                .length === 0
            }
            onClick={async () => {
              updateCasesState({
                type: ECasesActionType.exportFileType,
                payload: 'csv',
              });
              updateCasesState({
                type: ECasesActionType.downloadFile,
                payload: true,
              });
              await exportFile({
                ...searchParams,
                filter: filterable,
                clientsFilter: filterableByClient,
                fileType: 'csv',
                downloadFile,
                checkedProps: mapChecklistTrueFieldsToReqProps(
                  casesExportChecklistValues,
                ),
              });
            }}
          />
        }
        exportExcelButton={
          <ExportButton
            text={'exportExcel'}
            isLoading={isLoading}
            disabled={
              mapChecklistTrueFieldsToReqProps(casesExportChecklistValues)
                .length === 0
            }
            onClick={async () => {
              updateCasesState({
                type: ECasesActionType.exportFileType,
                payload: 'excel',
              });
              updateCasesState({
                type: ECasesActionType.downloadFile,
                payload: true,
              });
              await exportFile({
                ...searchParams,
                filter: filterable,
                clientsFilter: filterableByClient,
                fileType: 'excel',
                downloadFile,
                checkedProps: mapChecklistTrueFieldsToReqProps(
                  casesExportChecklistValues,
                ),
              });
            }}
          />
        }
      />
      {isSuccess && data ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateCasesState({
              type: ECasesActionType.openSuccessSnackbar,
              payload: false,
            })
          }
          severity="success"
          content={'messages.fileExportSuccess'}
        />
      ) : (
        ''
      )}
      {isError && error?.response?.data?.message ? (
        <SnackbarNotification
          open={openErrorSnackbar}
          onClose={() =>
            updateCasesState({
              type: ECasesActionType.openErrorSnackbar,
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

export { ExportCasesDialog };
