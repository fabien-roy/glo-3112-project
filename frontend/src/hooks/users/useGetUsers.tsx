import { useState } from 'react';
import { User } from 'types/users';
import useAPI from 'hooks/useAPI';

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, error, fetchData } = useAPI('getUsers', setUsers);

  // TODO : Use everything in the hook or remove them
  return { users, isLoading, error, fetchData };
}
