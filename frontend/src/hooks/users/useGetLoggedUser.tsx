import { useState } from 'react';
import { User } from 'types/users';
import { readUserFromCookie } from '../../util/cookie';

export default function useGetLoggedUser() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const user = readUserFromCookie();
  if (JSON.stringify(user) !== JSON.stringify(loggedUser)) {
    setLoggedUser(user);
  }

  return { loggedUser };
}
