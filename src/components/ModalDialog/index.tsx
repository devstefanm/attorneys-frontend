import * as React from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Box, Divider, IconButton, Modal, Stack } from '@mui/material';
import { ActionBar } from './components/ActionBar';
import { Close } from '@mui/icons-material';

type Props = {
  header?: string | React.ReactNode;
  open: boolean;
  isLoading?: boolean;
  hasCancelButton?: boolean;
  hasActionButton?: boolean;
  hasCloseIconButton?: boolean;
  hasExtraButton?: boolean;
  actionButtonText?: string;
  extraButtonText?: string;
  onClose: () => void;
  onExtraButtonClick?: any;
  onSubmit?: any;
  children: React.ReactNode;
};

const ModalDialog = (props: Props) => {
  const {
    header,
    open,
    children,
    isLoading,
    actionButtonText,
    extraButtonText,
    hasActionButton,
    hasCancelButton,
    hasExtraButton,
    hasCloseIconButton,
    onSubmit,
    onClose,
    onExtraButtonClick,
  } = props;

  return (
    <ErrorBoundary>
      <Modal className="py-20 mt-16 h-full fixed overflow-y-auto" open={open}>
        <Box className="modal-content mx-auto w-[900px] bg-white h-fit rounded border-0">
          <Stack className="pt-6 pb-2 mx-6 text-gray-500 text-xl">
            <Stack direction="row" className="items-center justify-between">
              {header}
              {hasCloseIconButton ? (
                <IconButton onClick={onClose}>
                  <Close />
                </IconButton>
              ) : (
                ''
              )}
            </Stack>
          </Stack>
          <Divider />
          <Stack className="my-8">{children}</Stack>
          <Divider />
          <Stack>
            {(hasCancelButton || hasActionButton || hasExtraButton) && (
              <ActionBar
                onSubmit={onSubmit}
                isLoading={isLoading}
                onClose={onClose}
                actionButtonText={actionButtonText}
                extraButtonText={extraButtonText}
                hasCancelButton={hasCancelButton}
                hasActionButton={hasActionButton}
                hasExtraButton={hasExtraButton}
                onExtraButtonClick={onExtraButtonClick}
              />
            )}
          </Stack>
        </Box>
      </Modal>
    </ErrorBoundary>
  );
};

export { ModalDialog };
