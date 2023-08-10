import * as React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Box, Stack } from '@mui/material';
import { Login } from '../features/auth/login/Login';
import logo from '../assets/icons/logo.svg';
import { EAuthFormType } from '../types/authTypes';
import { useAuth } from '../store/contexts/AuthContext';

type Props = {};

const Auth = (_props: Props) => {
  const {
    state: { authFormType },
  } = useAuth();

  const authFormTypeRecord: Record<EAuthFormType, JSX.Element> = {
    LOGIN: <Login />,
    // forgot: forgotPassword,
    // create: createPassword,
  };

  return (
    <ErrorBoundary>
      <React.Suspense>
        <Stack direction="row">
          <Box className="bg-[url('./assets/background/authRightBackground.svg')] h-screen w-1/3" />
          <Box className="bg-[url('./assets/background/authLeftBackground.svg')] h-screen w-2/3">
            <Box className="flex justify-center items-center h-screen">
              <Box className="bg-white h-[480px] w-[500px] rounded-lg">
                <img src={logo} className="mx-auto mt-10 w-80" />
                {authFormTypeRecord[authFormType]}
              </Box>
            </Box>
          </Box>
        </Stack>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Auth };
