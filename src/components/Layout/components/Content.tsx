import { Box } from '@mui/material';
import { LayoutProps } from '..';
import { ErrorBoundary } from '../../ErrorBoundary';
import * as React from 'react';

export type ContentProps = LayoutProps & {
  children: React.ReactNode;
};

const Content = (props: ContentProps) => {
  const { children } = props;
  return (
    <ErrorBoundary>
      <React.Suspense>
        <Box className={`my-20 mx-6 w-full`}>{children}</Box>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Content };
