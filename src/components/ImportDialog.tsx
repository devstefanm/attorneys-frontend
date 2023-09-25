import * as React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  title: string;
  uploadComponent: React.ReactNode;
  onClose: () => void;
  onSubmitFile: () => void;
  className?: string;
  submitButtonText?: string;
  isLoading?: boolean;
  file?: File | null;
};

const ImportDialog = (props: Props) => {
  const {
    onClose,
    onSubmitFile,
    open,
    title,
    uploadComponent,
    className,
    submitButtonText,
    isLoading,
    file,
  } = props;

  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Dialog
        fullWidth
        className={`z-[9999] ${className}`}
        open={open}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t(title)}</DialogTitle>
        <DialogContent>
          <Box className="mx-auto mb-10 mt-2">{uploadComponent}</Box>
          <Divider />
          <DialogContentText
            className="mt-6 flex justify-center"
            id="alert-dialog-slide-description"
          >
            <Button
              className="w-48"
              variant="contained"
              color="success"
              disabled={isLoading || !file}
              onClick={onSubmitFile}
            >
              {isLoading ? (
                <CircularProgress size={24} thickness={4} />
              ) : submitButtonText ? (
                t(submitButtonText)
              ) : (
                t('submitFile')
              )}
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  );
};

export { ImportDialog };
