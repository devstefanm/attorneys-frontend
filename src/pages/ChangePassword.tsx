import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../components/ErrorBoundary';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useAuth } from '../store/contexts/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { EAuthActionType } from '../store/reducers/authReducer';
import { IPagesProps } from '../libs/react-router-dom/routes';
import useUserIdFromAccessToken from '../hooks/utils/useUserIdFromAccessToken';
import useChangePasswordMutation from '../hooks/mutations/auth/useChangePasswordMutation';
import { SnackbarNotification } from '../components/SnackbarNotification';

type Props = IPagesProps & {};

const ChangePassword = (_props: Props) => {
  const {
    state: {
      showNewPassword,
      showNewRepeatedPassword,
      changePasswordCredentials,
      openErrorSnackbar,
      openSuccessSnackbar,
    },
    dispatch: updateChangePasswordState,
  } = useAuth();

  const { newPassword, newRepeatedPassword } = changePasswordCredentials;

  const userId = useUserIdFromAccessToken();

  const { t } = useTranslation();

  const {
    mutate: changePassword,
    isLoading,
    data,
    error,
    isSuccess,
    isError,
  } = useChangePasswordMutation(userId, updateChangePasswordState);

  const handleClickShowNewPassword = () =>
    updateChangePasswordState({
      type: EAuthActionType.show_new_password,
      payload: !showNewPassword,
    });

  const handleClickShowNewRepeatedPassword = () =>
    updateChangePasswordState({
      type: EAuthActionType.show_new_repeated_password,
      payload: !showNewRepeatedPassword,
    });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedLoginCredentials = {
      ...changePasswordCredentials,
      [name]: value,
    };
    updateChangePasswordState({
      type: EAuthActionType.change_password_credentials,
      payload: updatedLoginCredentials,
    });
  };

  const buttonDisabler = () => {
    if (
      newPassword !== newRepeatedPassword ||
      newPassword.length === 0 ||
      isLoading
    ) {
      return true;
    }
    return false;
  };

  const handleSubmitNewPassword = () => {
    changePassword(newPassword);
  };

  return (
    <ErrorBoundary>
      <React.Suspense fallback={'Loading....'}>
        <Box className="flex justify-center">
          <Stack className="w-96">
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label={t('newPassword')}
              type={showNewPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newRepeatedPassword"
              label={t('repeatNewPassword')}
              type={showNewRepeatedPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={newRepeatedPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewRepeatedPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showNewRepeatedPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              disabled={buttonDisabler()}
              className="mt-8"
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmitNewPassword}
            >
              {isLoading ? (
                <CircularProgress size={24} thickness={4} />
              ) : (
                t('changePassword')
              )}
            </Button>
          </Stack>
        </Box>
        {isSuccess && data?.data.message ? (
          <SnackbarNotification
            open={openSuccessSnackbar}
            onClose={() =>
              updateChangePasswordState({
                type: EAuthActionType.openSuccessSnackbar,
                payload: false,
              })
            }
            severity="success"
            content={data?.data.message}
          />
        ) : (
          ''
        )}
        {isError && error?.response?.data?.message ? (
          <SnackbarNotification
            open={openErrorSnackbar}
            onClose={() =>
              updateChangePasswordState({
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

export { ChangePassword };
