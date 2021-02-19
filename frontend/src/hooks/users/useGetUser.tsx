import { useState } from 'react';
import { User } from 'types/users';
import useAPI from 'hooks/useAPI';

// TODO : Should we not get a new user each time? Should we use users in state?
export default function useGetUser(username: string) {
  const [user, setUser] = useState<User>();
  const { isLoading, error, fetchData } = useAPI('getUser', setUser, {
    username,
  });

  // TODO : Use everything in the hook or remove them
  return { user, isLoading, error, fetchData };
}
