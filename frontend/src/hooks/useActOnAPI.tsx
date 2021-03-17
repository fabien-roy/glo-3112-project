import { useContext, useState } from 'react';
import APIService from 'services/APIService';
import { UserContext } from '../context/userContext';
import { readUserFromCookie } from '../util/cookie';

export default function useActOnAPI(method, setData, ...params) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, setUser } = useContext(UserContext);

  const act = (...actParams) => {
    setIsLoading(true);

    APIService[method](...params, ...actParams)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => {
        const loggedUser = readUserFromCookie();
        if (JSON.stringify(loggedUser) !== JSON.stringify(currentUser)) {
          setUser(loggedUser);
        }
        setIsLoading(false);
      });
  };

  return { act, isLoading, error };
}
