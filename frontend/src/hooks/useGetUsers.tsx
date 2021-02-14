import { useState } from 'react';
import axios from 'axios';
import { User } from 'types/users';

// TODO : Move API
const API = 'http://localhost:4000';

// TODO : Should useEffect be used?
// TODO : Should we not get new users each time?
export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);

  axios.get<User[]>(`${API}/users`).then((response) => setUsers(response.data));

  return users;
}
