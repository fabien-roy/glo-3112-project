import { useState } from 'react';
import { User } from 'types/users';
import useAPI from 'hooks/useAPI';

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, error } = useAPI('getUsers', setUsers);

  return { users, isLoading, error };
}
