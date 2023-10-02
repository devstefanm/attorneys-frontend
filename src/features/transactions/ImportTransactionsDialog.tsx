import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ImportDialog } from '../../components/ImportDialog';
import { FileUpload } from '../../components/FileUpload';
import useImportTransactionsListMutation from '../../hooks/mutations/transactions/useImportTransactionsListMutation';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import { ETransactionsActionType } from '../../types/transactionsTypes';
import { SnackbarNotification } from '../../components/SnackbarNotification';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ImportTransactionsDialog = (props: Props) => {
  const { open, onClose } = props;

  const {
    state: {
      transactionsFileForUpload,
      openSuccessSnackbar,
      openErrorSnackbar,
    },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const {
    isLoading,
    mutateAsync: importFile,
    data,
    error,
    isError,
    isSuccess,
  } = useImportTransactionsListMutation(onClose, updateTransactionsState);

  return (
    <ErrorBoundary>
      <ImportDialog
        title="entities.importTransactions"
        open={open}
        onClose={onClose}
        uploadComponent={
          <FileUpload
            onFileUpload={(file) =>
              updateTransactionsState({
                type: ETransactionsActionType.transactionsFileForUpload,
                payload: file,
              })
            }
            onFileDelete={() =>
              updateTransactionsState({
                type: ETransactionsActionType.resetTransactionFormData,
              })
            }
          />
        }
        isLoading={isLoading}
        file={transactionsFileForUpload}
        onSubmitFile={() =>
          transactionsFileForUpload && importFile(transactionsFileForUpload)
        }
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateTransactionsState({
              type: ETransactionsActionType.openSuccessSnackbar,
              payload: false,
            })
          }
          severity="success"
          content={data?.data.message}
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

export { ImportTransactionsDialog };
