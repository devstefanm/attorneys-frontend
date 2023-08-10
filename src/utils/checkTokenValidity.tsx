import axios from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

interface IJwtPayload extends JwtPayload {
  role_name: string | null;
}

const checkTokenValidity = (): { valid: boolean; role: string | null } => {
  const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_NAME);
  if (token) {
    try {
      const decodedToken: IJwtPayload = jwtDecode(token);
      const now = moment();
      const expirationTime = moment(decodedToken.exp, 'X');
      if (now.isSameOrAfter(expirationTime)) {
        axios.defaults.headers.common['Authorization'] = ``;
        localStorage.removeItem(token);
        return { valid: false, role: null };
      }
      return { valid: true, role: decodedToken.role_name };
    } catch (error) {
      return { valid: false, role: null };
    }
  }
  return { valid: false, role: null };
};

export { checkTokenValidity };
