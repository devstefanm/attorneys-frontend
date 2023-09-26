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
import { SnackbarNotification } from '../../components/SnackbarNotification';

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
    state: {
      editedCaseFormData,
      editCaseId,
      confirmationDialogOpen,
      openSuccessSnackbar,
      openErrorSnackbar,
    },
    dispatch: updateCasesState,
  } = useCases();

  const {
    mutate: editCase,
    isLoading: isEditLoading,
    data: editData,
    error: editError,
    isSuccess: isEditSuccess,
    isError: isEditError,
  } = useEditCaseMutation(onClose, updateCasesState, editCaseId as number);

  const {
    mutate: daleteCase,
    isLoading: isDeleteLoading,
    data: deleteData,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteCaseMutation(
    onConfirmationDialogClose,
    updateCasesState,
    editCaseId as number,
  );

  const isError = isEditError || isDeleteError;
  const isSuccess = isEditSuccess || isDeleteSuccess;
  const data = editData || deleteData;
  const error = editError || deleteError;

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
        isLoading={isEditLoading}
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
        isLoading={isDeleteLoading}
        open={confirmationDialogOpen}
        onClose={() => onConfirmationDialogClose()}
        onSubmit={() => daleteCase()}
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
          content={error?.response?.data?.message}
        />
      ) : (
        ''
      )}
    </ErrorBoundary>
  );
};

export { EditCaseModal };
