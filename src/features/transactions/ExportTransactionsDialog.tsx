import * as React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ExportDialog } from '../../components/ExportDialog';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import { mapSearchToQueryParam } from '../../utils/transformData';
import { ExportButton } from '../../components/ExportButton';
import { useTranslation } from 'react-i18next';
import { ETransactionsActionType } from '../../types/transactionsTypes';
import useExportTransactionsListMutation from '../../hooks/mutations/transactions/useExportTransactionsListMutation';
import moment from 'moment';
import { SnackbarNotification } from '../../components/SnackbarNotification';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ExportTransactionsDialog = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();
  const {
    state: {
      searchable,
      filterable,
      filterableDate,
      downloadFile,
      exportFileType,
      openSuccessSnackbar,
      openErrorSnackbar,
      totalAmount,
    },
    dispatch: updateTransactionsState,
  } = useTransactions();

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
  } = useExportTransactionsListMutation(updateTransactionsState);

  React.useEffect(() => {
    if (!isLoading && data) {
      const url = window.URL.createObjectURL(data as Blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${t('entities.transactions')} - ${moment().format(
        'YYYY.MM.DD HH-mm',
      )}${exportFileType === 'excel' ? '.xlsx' : '.csv'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      if (isSuccess) {
        updateTransactionsState({
          type: ETransactionsActionType.openSuccessSnackbar,
          payload: true,
        });

        setTimeout(() => {
          onClose();
        }, 1500);
      }
    }
  }, [isLoading, data]);

  return (
    <ErrorBoundary>
      <ExportDialog
        title={'entities.exportTransactions'}
        open={open}
        onClose={onClose}
        exportCSVButton={
          <ExportButton
            text={'exportCSV'}
            isLoading={isLoading}
            disabled={Boolean(!totalAmount)}
            onClick={async () => {
              updateTransactionsState({
                type: ETransactionsActionType.exportFileType,
                payload: 'csv',
              });
              updateTransactionsState({
                type: ETransactionsActionType.downloadFile,
                payload: true,
              });
              await exportFile({
                ...searchParams,
                filter: filterable,
                filterableDate: filterableDate,
                fileType: 'csv',
                downloadFile,
              });
            }}
          />
        }
        exportExcelButton={
          <ExportButton
            text={'exportExcel'}
            isLoading={isLoading}
            disabled={Boolean(!totalAmount)}
            onClick={async () => {
              updateTransactionsState({
                type: ETransactionsActionType.exportFileType,
                payload: 'excel',
              });
              updateTransactionsState({
                type: ETransactionsActionType.downloadFile,
                payload: true,
              });
              await exportFile({
                ...searchParams,
                filter: filterable,
                filterableDate: filterableDate,
                fileType: 'excel',
                downloadFile,
              });
            }}
          />
        }
      />
      {isSuccess && data ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateTransactionsState({
              type: ETransactionsActionType.openSuccessSnackbar,
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
            updateTransactionsState({
              type: ETransactionsActionType.openErrorSnackbar,
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

export { ExportTransactionsDialog };
