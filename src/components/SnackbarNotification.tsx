import * as React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onClose: () => void;
  content: string;
  autoHideDuration?: number;
  severity?: AlertColor;
  className?: string;
};

const SnackbarNotification = (props: Props) => {
  const { open, content, autoHideDuration, severity, className, onClose } =
    props;
  const { t } = useTranslation();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <ErrorBoundary>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration || 3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          className={`text-base w-full ${className}`}
          severity={severity || 'info'}
        >
          {t(content)}
        </Alert>
      </Snackbar>
    </ErrorBoundary>
  );
};

export { SnackbarNotification };
