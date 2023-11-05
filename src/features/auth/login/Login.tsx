import * as React from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useAuth } from '../../../store/contexts/AuthContext';
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import useLoginMutation from '../../../hooks/mutations/auth/useLoginMutation';
import { useNavigate } from 'react-router-dom';
import { EAuthActionType } from '../../../store/reducers/authReducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { SnackbarNotification } from '../../../components/SnackbarNotification';

type Props = {};

const Login = (_props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    state: { loginCredentials, showPassword, openErrorSnackbar },
    dispatch: updateLoginState,
  } = useAuth();
  const {
    mutateAsync: postLogin,
    isError,
    error,
  } = useLoginMutation(navigate, updateLoginState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedLoginCredentials = {
      ...loginCredentials,
      [name]: value,
    };
    updateLoginState({
      type: EAuthActionType.login_user,
      payload: updatedLoginCredentials,
    });
  };

  const handleClickShowPassword = () =>
    updateLoginState({
      type: EAuthActionType.show_password,
      payload: !showPassword,
    });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const identifier = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    postLogin({ identifier, password });
  };

  return (
    <ErrorBoundary>
      <React.Suspense>
        <Stack component="form" className="mx-14 my-10" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('emailOrUsername')}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            defaultValue={loginCredentials.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            defaultValue={loginCredentials.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="mt-8"
            size="large"
            type="submit"
            fullWidth
            variant="contained"
          >
            {t('login')}
          </Button>
        </Stack>
        {isError && error?.response?.data?.message ? (
          <SnackbarNotification
            open={openErrorSnackbar}
            onClose={() =>
              updateLoginState({
                type: EAuthActionType.openErrorSnackbar,
                payload: false,
              })
            }
            severity="error"
            content={error?.response?.data?.message}
          />
        ) : (
          ''
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Login };
