import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddCaseForm from './AddCaseForm';
import useAddNewCaseMutation from '../../hooks/mutations/cases/useAddNewCaseMutation';
import { useCases } from '../../store/contexts/CasesContext';
import { mapAddCaseFormToRequestData } from './helpers/casesHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { ECasesActionType } from '../../types/casesTypes';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCaseModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addCaseForm, openSuccessSnackbar, openErrorSnackbar },
    dispatch: updateCasesState,
  } = useCases();

  const {
    mutate: postNewCase,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
  } = useAddNewCaseMutation(onClose, updateCasesState);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewCase')}
        children={<AddCaseForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() => postNewCase(mapAddCaseFormToRequestData(addCaseForm))}
        isLoading={isLoading}
        hasCloseIconButton={true}
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

export { AddCaseModal };
