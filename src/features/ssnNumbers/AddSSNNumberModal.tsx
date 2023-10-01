import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddSSNNumberForm from './AddSSNNumberForm';
import useAddNewSSNNumberMutation from '../../hooks/mutations/ssnNumbers/useAddNewSSNNumberMutation';
import { useSSNNumbers } from '../../store/contexts/SSNNumbersContext';
import { mapAddSSNNumberFormToRequestData } from './helpers/ssnNumbersHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { ESSNNumbersActionType } from '../../types/ssnNumbersTypes';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddSSNNumberModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      addSSNNumberForm,
      openSuccessSnackbar,
      openErrorSnackbar,
      addSSNNumberModalOpen,
      editSSNNumberModalOpen,
    },
    dispatch: updateSSNNumbersState,
  } = useSSNNumbers();

  const {
    mutate: postNewSSNNumber,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
    reset,
  } = useAddNewSSNNumberMutation(onClose, updateSSNNumbersState);

  React.useEffect(() => {
    if ((addSSNNumberModalOpen || editSSNNumberModalOpen) && isSuccess) reset();
  }, [addSSNNumberModalOpen, editSSNNumberModalOpen]);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewSSNNumber')}
        children={<AddSSNNumberForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewSSNNumber(mapAddSSNNumberFormToRequestData(addSSNNumberForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateSSNNumbersState({
              type: ESSNNumbersActionType.openSuccessSnackbar,
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
            updateSSNNumbersState({
              type: ESSNNumbersActionType.openErrorSnackbar,
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

export default AddSSNNumberModal;
