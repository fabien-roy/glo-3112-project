import { useState } from 'react';
import { User } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useUpdateUser(username: string) {
  const [user, setUser] = useState<User>();
  const { act: updateUser, error } = useActOnAPI(
    'updateUser',
    setUser,
    username
  );

  return { updateUser, user, error };
}
