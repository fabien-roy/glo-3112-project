import { useEffect, useState } from 'react';
import { User } from 'types/users';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

// TODO : Refactor this hook to only consider logged user
export default function useGetLoggedUser() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const test = (x) => {
    console.log('test');
    console.log(x);
    setLoggedUser(x);
  };
  const { isLoading, error } = useFetchFromAPI('getLoggedUser', test);

  // useEffect(() => {
  //   if (users.length > 0) setLoggedUser(users[0]);
  // }, [users]);

  return { loggedUser, isLoading, error };
}
