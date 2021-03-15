import { useState } from 'react';
import { User } from 'types/users';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetLoggedUser() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const { isLoading, error } = useFetchFromAPI('getLoggedUser', setLoggedUser);

  return { loggedUser, isLoading, error };
}
