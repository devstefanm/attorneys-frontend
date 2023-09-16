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
  extraButtonText?: string;
  hasActionButton?: boolean;
  hasCancelButton?: boolean;
  hasExtraButton?: boolean;
  onExtraButtonClick?: any;
};

const ActionBar = (props: Props) => {
  const {
    isLoading,
    onClose,
    onSubmit,
    actionButtonText = 'submit',
    extraButtonText = 'delete',
    hasActionButton,
    hasCancelButton = true,
    hasExtraButton = false,
    onExtraButtonClick,
  } = props;

  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Box
        className={`flex ${
          hasExtraButton ? 'justify-between' : 'justify-end'
        } my-3 mx-5`}
      >
        {hasExtraButton && (
          <Button
            className="text-base"
            color="error"
            onClick={onExtraButtonClick}
          >
            {t(extraButtonText)}
          </Button>
        )}
        <Box>
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
      </Box>
    </ErrorBoundary>
  );
};

export { ActionBar };
