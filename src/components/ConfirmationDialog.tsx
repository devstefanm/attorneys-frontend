import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { ErrorBoundary } from './ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  title: string;
  contentText?: string;
  cancelButtonText?: string;
  actionButtonText?: string;
  onClose: () => void;
  onSubmit: any;
  isLoading?: boolean;
  className?: string;
};

const ConfirmationDialog = (props: Props) => {
  const {
    actionButtonText = 'yes',
    cancelButtonText = 'no',
    onClose,
    onSubmit,
    open,
    title,
    contentText = 'areYouSure',
    isLoading,
    className,
  } = props;

  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Dialog
        fullWidth
        className={`z-[9999] ${className}`}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t(title)}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t(contentText)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t(cancelButtonText)}</Button>
          <Button onClick={onSubmit}>
            {isLoading ? (
              <CircularProgress size={24} thickness={4} />
            ) : (
              t(actionButtonText)
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </ErrorBoundary>
  );
};

export { ConfirmationDialog };
