import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      !window.location.href.includes('login')
    ) {
      window.location.assign('/login');
    }
  }
);
