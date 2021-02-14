import { useState, useEffect } from 'react';
import APIService from '../services/APIService';
import { User } from '../types/users';

export default function useGetUsers() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    retrieveUsers();
  });

  // TODO : Handle error
  const retrieveUsers = () => {
    APIService.getUsers().then((response) => {
      setUsers(response.data);
    });
  };

  return users;
}
