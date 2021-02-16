import axios from 'axios';

// TODO : Get API base URL from en var
export default axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json',
  },
});
