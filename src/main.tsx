import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import './libs/i18next/i18n.ts';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';
import muiTheme from './libs/mui/muiTheme.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
