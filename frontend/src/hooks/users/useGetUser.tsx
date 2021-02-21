import { useState } from 'react';
import { User } from 'types/users';
import useAPI from 'hooks/useAPI';

export default function useGetUser(username: string) {
  const [user, setUser] = useState<User>();
  const { isLoading, error } = useAPI('getUser', setUser, username);

  return { user, isLoading, error };
}
