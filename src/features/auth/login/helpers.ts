import { ILoginCredentials } from '../../../types/authTypes';

export const mapStateToRequest = ({ email, password }: ILoginCredentials) => ({
  identifier: email,
  password,
});
