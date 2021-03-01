import { useState } from 'react';
import { User } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>();
  const { act: getUsers } = useActOnAPI('getUsers', setUsers);

  return { getUsers, users };
}
