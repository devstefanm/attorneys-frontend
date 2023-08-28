import * as React from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Box, Divider, Modal, Stack } from '@mui/material';
import { ActionBar } from './components/ActionBar';

type Props = {
  header?: string | React.ReactNode;
  open: boolean;
  isLoading?: boolean;
  hasCancelButton?: boolean;
  hasActionButton?: boolean;
  actionButtonText?: string;
  onClose: () => void;
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
    hasActionButton,
    hasCancelButton,
    onSubmit,
    onClose,
  } = props;

  return (
    <ErrorBoundary>
      <Modal className="py-20 mt-16 h-full fixed overflow-y-auto" open={open}>
        <Box className="modal-content mx-auto w-[800px] bg-white h-fit rounded border-0">
          <Stack className="flex pt-6 pb-2 mx-6 text-gray-500 text-xl">
            {header}
          </Stack>
          <Divider />
          <Stack className="my-8">{children}</Stack>
          <Divider />
          <Stack>
            {(hasCancelButton || hasActionButton) && (
              <ActionBar
                onSubmit={onSubmit}
                isLoading={isLoading}
                onClose={onClose}
                actionButtonText={actionButtonText}
                hasCancelButton={hasCancelButton}
                hasActionButton={hasActionButton}
              />
            )}
          </Stack>
        </Box>
      </Modal>
    </ErrorBoundary>
  );
};

export { ModalDialog };
