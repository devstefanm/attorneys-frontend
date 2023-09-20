import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import * as React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  title: string;
  exportCSVButton: React.ReactNode;
  exportExcelButton: React.ReactNode;
  onClose: () => void;
  className?: string;
};

const ExportDialog = (props: Props) => {
  const {
    onClose,
    open,
    title,
    exportCSVButton,
    exportExcelButton,
    className,
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
          <DialogContentText id="alert-dialog-slide-description">
            <Stack
              className="m-10"
              direction="row"
              justifyContent="space-between"
            >
              <Box>{exportCSVButton}</Box>
              <Box>{exportExcelButton}</Box>
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  );
};

export { ExportDialog };
