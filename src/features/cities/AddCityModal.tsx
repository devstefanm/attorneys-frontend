import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddCityForm from './AddCityForm';
import useAddNewCityMutation from '../../hooks/mutations/cities/useAddNewCityMutation';
import { useCities } from '../../store/contexts/CitiesContext';
import { mapAddCityFormToRequestData } from './helpers/citiesHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCityModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addCityForm },
    dispatch: updateCitiesState,
  } = useCities();

  const { mutate: postNewCity, isLoading } = useAddNewCityMutation(
    onClose,
    updateCitiesState,
  );

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
    </ErrorBoundary>
  );
};

export default AddCityModal;
