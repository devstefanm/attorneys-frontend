import * as React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Box, Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GetApp } from '@mui/icons-material';

type Props = {
  isLoading?: boolean;
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const ExportButton = (props: Props) => {
  const { icon, isLoading, text, disabled, onClick } = props;

  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <Button
        className="w-52 h-16 flex justify-between items-center"
        variant="contained"
        color="info"
        startIcon={icon || <GetApp />}
        disabled={isLoading || disabled}
        onClick={() => onClick && onClick()}
      >
        <Box className="w-full flex items-center justify-center">
          {isLoading ? (
            <CircularProgress color="inherit" size={24} thickness={4} />
          ) : (
            t(text)
          )}
        </Box>
      </Button>
    </ErrorBoundary>
  );
};

export { ExportButton };
