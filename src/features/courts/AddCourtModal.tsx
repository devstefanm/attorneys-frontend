import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ModalDialog } from '../../components/ModalDialog';
import AddCourtForm from './AddCourtForm';
import useAddNewCourtMutation from '../../hooks/mutations/courts/useAddNewCourtMutation';
import { useCourts } from '../../store/contexts/CourtsContext';
import { mapAddCourtFormToRequestData } from './helpers/courtsHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCourtModal = (props: Props) => {
  const { open, onClose } = props;

  const { t } = useTranslation();

  const {
    state: { addCourtForm },
    dispatch: updateCourtsState,
  } = useCourts();

  const { mutate: postNewCourt, isLoading } = useAddNewCourtMutation(
    onClose,
    updateCourtsState,
  );

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
    </ErrorBoundary>
  );
};

export default AddCourtModal;
