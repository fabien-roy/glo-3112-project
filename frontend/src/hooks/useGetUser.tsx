import { useState, useEffect } from 'react';
import { User } from 'types/users';
import APIService from '../services/APIService';

// TODO : Should we not get a new user each time? Should we use users in state?
export default function useGetUser(username: string) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    retrieveUser();
  });

  // TODO : Handle error
  const retrieveUser = () => {
    APIService.getUser(username).then((response) => {
      setUser(response.data);
    });
  };

  return user;
}
