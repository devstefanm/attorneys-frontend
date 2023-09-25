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
  } = useExportCasesListMutation();

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
              onClose();
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
              onClose();
            }}
          />
        }
      />
    </ErrorBoundary>
  );
};

export { ExportCasesDialog };
