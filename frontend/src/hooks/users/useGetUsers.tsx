import { useState } from 'react';
import { User } from 'types/users';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, act: getUsers } = useFetchFromAPI('getUsers', setUsers);

  return { users, isLoading, getUsers };
}
