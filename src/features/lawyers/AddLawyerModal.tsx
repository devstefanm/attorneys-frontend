import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddLawyerForm from './AddLawyerForm';
import useAddNewLawyerMutation from '../../hooks/mutations/lawyers/useAddNewLawyerMutation';
import { useLawyers } from '../../store/contexts/LawyersContext';
import { mapAddLawyerFormToRequestData } from './helpers/lawyersHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { ELawyersActionType } from '../../types/lawyersTypes';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddLawyerModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addLawyerForm, openSuccessSnackbar, openErrorSnackbar },
    dispatch: updateLawyersState,
  } = useLawyers();

  const {
    mutate: postNewLawyer,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
  } = useAddNewLawyerMutation(onClose, updateLawyersState);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewLawyer')}
        children={<AddLawyerForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewLawyer(mapAddLawyerFormToRequestData(addLawyerForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateLawyersState({
              type: ELawyersActionType.openSuccessSnackbar,
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
            updateLawyersState({
              type: ELawyersActionType.openErrorSnackbar,
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

export default AddLawyerModal;
