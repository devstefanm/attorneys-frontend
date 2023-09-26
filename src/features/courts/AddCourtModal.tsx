import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddCourtForm from './AddCourtForm';
import useAddNewCourtMutation from '../../hooks/mutations/courts/useAddNewCourtMutation';
import { useCourts } from '../../store/contexts/CourtsContext';
import { mapAddCourtFormToRequestData } from './helpers/courtsHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { ECourtsActionType } from '../../types/courtsTypes';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCourtModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addCourtForm, openSuccessSnackbar, openErrorSnackbar },
    dispatch: updateCourtsState,
  } = useCourts();

  const {
    mutate: postNewCourt,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
  } = useAddNewCourtMutation(onClose, updateCourtsState);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewCourt')}
        children={<AddCourtForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewCourt(mapAddCourtFormToRequestData(addCourtForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateCourtsState({
              type: ECourtsActionType.openSuccessSnackbar,
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
            updateCourtsState({
              type: ECourtsActionType.openErrorSnackbar,
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

export default AddCourtModal;
