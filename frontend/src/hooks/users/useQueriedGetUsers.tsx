import { useState } from 'react';
import { User } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

// TODO : Should this be merged with regular useGetUsers?
export default function useQueriedGetUsers() {
  const [users, setUsers] = useState<User[]>();
  const { act: getUsers } = useActOnAPI('getUsers', setUsers);

  return { getUsers, users };
}
