import axios, { AxiosRequestConfig } from 'axios';

const URL_ROOT = `${
  import.meta.env.VITE_APP_BASE_URL ??
  'https://attorneys-backend-d0ab9abeab26.herokuapp.com'
}${
  import.meta.env.VITE_APP_BASE_PORT
    ? ':' + import.meta.env.VITE_APP_BASE_PORT
    : ''
}`;

export const api = axios.create({
  baseURL: URL_ROOT,
});

export const setupAxios = ({
  method,
  url,
  data,
  params,
  withCredentials,
  headers,
}: AxiosRequestConfig) => {
  const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_NAME);
  return api({
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(withCredentials && { Authorization: `Bearer ${token}` }),
      ...(headers && headers),
    },
    data: data,
    params: params,
  });
};
