import { useState } from 'react';
import axios from 'axios';
import { User } from 'types/users';

// TODO : Move API
const API = 'http://localhost:4000';

// TODO : Should useEffect be used?
// TODO : Should we not get a new user each time?
export default function useGetUser(username: string) {
  const [user, setUser] = useState<User>();
  const [users] = useState<User[]>([]);

  const foundUser = users.find((u) => u.username === username);

  if (foundUser) {
    setUser(foundUser);
  } else {
    axios
      .get<User>(`${API}/users/${username}`)
      .then((response) => setUser(response.data));
  }

  return user;
}
