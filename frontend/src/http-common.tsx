import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

export default axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
