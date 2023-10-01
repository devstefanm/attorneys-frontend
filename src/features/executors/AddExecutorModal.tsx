import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddExecutorForm from './AddExecutorForm';
import useAddNewExecutorMutation from '../../hooks/mutations/executors/useAddNewExecutorMutation';
import { useExecutors } from '../../store/contexts/ExecutorsContext';
import { mapAddExecutorFormToRequestData } from './helpers/executorsHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { EExecutorsActionType } from '../../types/executorsTypes';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddExecutorModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      addExecutorForm,
      openSuccessSnackbar,
      openErrorSnackbar,
      addExecutorModalOpen,
      editExecutorModalOpen,
    },
    dispatch: updateExecutorsState,
  } = useExecutors();

  const {
    mutate: postNewExecutor,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
    reset,
  } = useAddNewExecutorMutation(onClose, updateExecutorsState);

  React.useEffect(() => {
    if ((addExecutorModalOpen || editExecutorModalOpen) && isSuccess) reset();
  }, [addExecutorModalOpen, editExecutorModalOpen]);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewExecutor')}
        children={<AddExecutorForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewExecutor(mapAddExecutorFormToRequestData(addExecutorForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateExecutorsState({
              type: EExecutorsActionType.openSuccessSnackbar,
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
            updateExecutorsState({
              type: EExecutorsActionType.openErrorSnackbar,
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

export default AddExecutorModal;
