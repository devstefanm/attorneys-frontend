import * as React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Box, MenuItem, Select, Stack } from '@mui/material';
import { Login } from '../features/auth/login/Login';
import logo from '../assets/icons/logo.svg';
import { EAuthFormType } from '../types/authTypes';
import { useAuth } from '../store/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { languageOptionsData } from '../components/Layout/nav/languageOptionsData';

type Props = {};

const Auth = (_props: Props) => {
  const {
    state: { authFormType },
  } = useAuth();

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

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
            <Select
              labelId="demo-simple-select-standard-label"
              variant="standard"
              id="demo-simple-select-standard"
              value={currentLanguage}
              className="w-10 flex float-right mt-4 mr-4"
              onChange={(event) =>
                i18n.changeLanguage(event.target.value as string)
              }
              label={t('language')}
              MenuProps={{
                className: 'mt-4',
              }}
              inputProps={{ IconComponent: () => null, className: 'px-2' }}
            >
              {languageOptionsData.map((option) => (
                <MenuItem
                  key={option.id}
                  className="margin-auto px-2"
                  value={option.name}
                >
                  {option.icon}
                </MenuItem>
              ))}
            </Select>
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
