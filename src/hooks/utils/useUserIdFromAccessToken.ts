import jwtDecode from 'jwt-decode';

const useUserIdFromAccessToken = (): number | null => {
  const token = localStorage.getItem('attorneys_access_token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userId: number = decodedToken?.id;

    return userId;
  }
  return null;
};

export default useUserIdFromAccessToken;
