import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddEmployerForm from './AddEmployerForm';
import useAddNewEmployerMutation from '../../hooks/mutations/employers/useAddNewEmployerMutation';
import { useEmployers } from '../../store/contexts/EmployersContext';
import { mapAddEmployerFormToRequestData } from './helpers/employersHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { EEmployersActionType } from '../../types/employersTypes';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddEmployerModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: {
      addEmployerForm,
      openSuccessSnackbar,
      openErrorSnackbar,
      addEmployerModalOpen,
      editEmployerModalOpen,
    },
    dispatch: updateEmployersState,
  } = useEmployers();

  const {
    mutate: postNewEmployer,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
    reset,
  } = useAddNewEmployerMutation(onClose, updateEmployersState);

  React.useEffect(() => {
    if ((addEmployerModalOpen || editEmployerModalOpen) && isSuccess) reset();
  }, [addEmployerModalOpen, editEmployerModalOpen]);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewEmployer')}
        children={<AddEmployerForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() =>
          postNewEmployer(mapAddEmployerFormToRequestData(addEmployerForm))
        }
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateEmployersState({
              type: EEmployersActionType.openSuccessSnackbar,
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
            updateEmployersState({
              type: EEmployersActionType.openErrorSnackbar,
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

export default AddEmployerModal;
