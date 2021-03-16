import { useState } from 'react';
import { User } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useDeleteUser(username: string) {
  const [, setUser] = useState<User>();
  const { act: deleteUser, error } = useActOnAPI(
    'deleteUser',
    setUser,
    username
  );

  return { deleteUser, error };
}
