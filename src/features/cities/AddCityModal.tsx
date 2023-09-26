import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddCityForm from './AddCityForm';
import useAddNewCityMutation from '../../hooks/mutations/cities/useAddNewCityMutation';
import { useCities } from '../../store/contexts/CitiesContext';
import { mapAddCityFormToRequestData } from './helpers/citiesHelpers';
import { SnackbarNotification } from '../../components/SnackbarNotification';
import { ECitiesActionType } from '../../types/citiesTypes';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCityModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addCityForm, openSuccessSnackbar, openErrorSnackbar },
    dispatch: updateCitiesState,
  } = useCities();

  const {
    mutate: postNewCity,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
  } = useAddNewCityMutation(onClose, updateCitiesState);

  return (
    <ErrorBoundary>
      <ModalDialog
        open={open}
        header={t('entities.addNewCity')}
        children={<AddCityForm />}
        onClose={onClose}
        hasActionButton={true}
        actionButtonText="submit"
        hasCancelButton={true}
        onSubmit={() => postNewCity(mapAddCityFormToRequestData(addCityForm))}
        isLoading={isLoading}
        hasCloseIconButton={true}
      />
      {isSuccess && data?.data.message ? (
        <SnackbarNotification
          open={openSuccessSnackbar}
          onClose={() =>
            updateCitiesState({
              type: ECitiesActionType.openSuccessSnackbar,
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
            updateCitiesState({
              type: ECitiesActionType.openErrorSnackbar,
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

export default AddCityModal;
