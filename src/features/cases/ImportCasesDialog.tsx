import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ImportDialog } from '../../components/ImportDialog';
import { FileUpload } from '../../components/FileUpload';
import useImportCasesListMutation from '../../hooks/mutations/cases/useImportCasesListMutation';
import { useCases } from '../../store/contexts/CasesContext';
import { ECasesActionType } from '../../types/casesTypes';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ImportCasesDialog = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { casesFileForUpload, openSuccessSnackbar, openErrorSnackbar },
    dispatch: updateCasesState,
  } = useCases();

  const transformErrorMessage = (input: string | string[]): string => {
    if (typeof input === 'string') {
      return input;
    }
    return input
      .map((item) => {
        const [entityPath, number, errorPath] = item.split('->');
        return `${t(entityPath)} -> ${number} -> ${t(errorPath)}`;
      })
      .join(' ');
  };

  const {
    isLoading,
    mutateAsync: importFile,
    data,
    error,
    isError,
    isSuccess,
  } = useImportCasesListMutation(onClose, updateCasesState);

  return (
    <ErrorBoundary>
      <ImportDialog
        title="entities.importCases"
        open={open}
        onClose={onClose}
        uploadComponent={
          <FileUpload
            onFileUpload={(file) =>
              updateCasesState({
                type: ECasesActionType.casesFileForUpload,
                payload: file,
              })
            }
            onFileDelete={() =>
              updateCasesState({ type: ECasesActionType.resetCaseFormData })
            }
          />
        }
        isLoading={isLoading}
        file={casesFileForUpload}
        onSubmitFile={() =>
          casesFileForUpload && importFile(casesFileForUpload)
        }
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateCasesState({
              type: ECasesActionType.openSuccessSnackbar,
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
            updateCasesState({
              type: ECasesActionType.openErrorSnackbar,
              payload: false,
            })
          }
          severity="error"
          content={transformErrorMessage(error?.response?.data?.message)}
          autoHideDuration={
            typeof error?.response?.data?.message !== 'string'
              ? error?.response?.data?.message.length * 3000
              : 3000
          }
        />
      ) : (
        ''
      )}
    </ErrorBoundary>
  );
};

export { ImportCasesDialog };
