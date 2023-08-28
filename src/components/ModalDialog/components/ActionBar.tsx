import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../ErrorBoundary';

type Props = {
  onSubmit?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
  actionButtonText?: string;
  hasActionButton?: boolean;
  hasCancelButton?: boolean;
};

const ActionBar = (props: Props) => {
  const {
    isLoading,
    onClose,
    onSubmit,
    actionButtonText = 'submit',
    hasActionButton,
    hasCancelButton = true,
  } = props;

  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Box className="flex justify-end my-3 mx-5">
        {hasCancelButton && (
          <Button className="text-base" color="inherit" onClick={onClose}>
            {t('cancel')}
          </Button>
        )}
        {hasActionButton && (
          <Button
            className="ml-4 text-base"
            color="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} thickness={4} />
            ) : (
              t(actionButtonText)
            )}
          </Button>
        )}
      </Box>
    </ErrorBoundary>
  );
};

export { ActionBar };
