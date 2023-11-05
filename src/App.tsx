import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { routes } from './libs/react-router-dom/routes';
import useValidateUser from './hooks/utils/useValidateUser';
import ProtectedPage from './features/protected/ProtectedPage';
import { TransactionsStateProvider } from './store/contexts/TransactionsContext';

const App = () => {
  const { role, valid } = useValidateUser();
  const element = useRoutes(routes(valid, role));

  const { pageLabel } = element?.props.children.props;

  return (
    <ErrorBoundary>
      <React.Suspense>
        {valid ? (
          <TransactionsStateProvider>
            <ProtectedPage element={element} pageLabel={pageLabel} />
          </TransactionsStateProvider>
        ) : (
          <>{element}</>
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { App };
