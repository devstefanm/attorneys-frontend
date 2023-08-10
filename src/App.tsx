import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { routes } from './libs/react-router-dom/routes';
import useValidateUser from './hooks/utils/useValidateUser';
import ProtectedPage from './features/protected/ProtectedPage';

const App = () => {
  const { role, valid } = useValidateUser();
  const element = useRoutes(routes(valid, role));

  const { pageLabel } = element?.props.children.props;

  return (
    <ErrorBoundary>
      <React.Suspense>
        {valid ? (
          <ProtectedPage element={element} pageLabel={pageLabel} />
        ) : (
          <>{element}</>
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { App };
