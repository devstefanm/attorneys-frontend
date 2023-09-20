import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import useEditCaseMutation from '../../hooks/mutations/cases/useEditCaseMutation';
import { useCases } from '../../store/contexts/CasesContext';
import { mapEditCaseFormToRequestData } from './helpers/casesHelpers';
import EditCaseForm from './EditCaseForm';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { ECasesActionType } from '../../types/casesTypes';
import useDeleteCaseMutation from '../../hooks/mutations/cases/useDeleteCaseMutation';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditCaseModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const onConfirmationDialogClose = () => {
    updateCasesState({
      type: ECasesActionType.confirmationDialogOpen,
      payload: false,
    });
    onClose();
  };

  const {
    state: { editedCaseFormData, editCaseId, confirmationDialogOpen },
    dispatch: updateCasesState,
  } = useCases();

  const { mutate: editCase, isLoading } = useEditCaseMutation(
    onClose,
    updateCasesState,
    editCaseId as number,
  );

  const { mutate: daleteCase, isLoading: isLoadingDelete } =
    useDeleteCaseMutation(
      onConfirmationDialogClose,
      updateCasesState,
      editCaseId as number,
    );

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.editCase')}
        children={<EditCaseForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          editCase(mapEditCaseFormToRequestData(editedCaseFormData))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
        extraButtonText="delete"
        hasExtraButton={true}
        onExtraButtonClick={() =>
          updateCasesState({
            type: ECasesActionType.confirmationDialogOpen,
            payload: !confirmationDialogOpen,
          })
        }
      />
      <ConfirmationDialog
        title="entities.deleteCase"
        isLoading={isLoadingDelete}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteCase()}
      />
    </ErrorBoundary>
  );
};

export { EditCaseModal };
