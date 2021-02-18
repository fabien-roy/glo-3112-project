import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000', // TODO : Why does process.env.BACKEND_URL do not work?
  headers: {
    'Content-type': 'application/json',
  },
});
