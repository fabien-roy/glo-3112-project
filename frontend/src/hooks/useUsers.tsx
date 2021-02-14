import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from 'types/users';

// TODO : Move API
const API = 'http://localhost:4000';

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>(`${API}/users`)
      .then((response) => setUsers(response.data));
  });

  return users;
}
