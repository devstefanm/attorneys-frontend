import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ImportDialog } from '../../components/ImportDialog';
import { FileUpload } from '../../components/FileUpload';
import useImportCasesListMutation from '../../hooks/mutations/cases/useImportCasesListMutation';
import { useCases } from '../../store/contexts/CasesContext';
import { ECasesActionType } from '../../types/casesTypes';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ImportCasesDialog = (props: Props) => {
  const { open, onClose } = props;

  const {
    state: { casesFileForUpload },
    dispatch: updateCasesState,
  } = useCases();

  const { isLoading, mutateAsync: importFile } =
    useImportCasesListMutation(onClose);

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
    </ErrorBoundary>
  );
};

export { ImportCasesDialog };
