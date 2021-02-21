import { useState } from 'react';
import { User, UserModificationParams } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useUpdateUser(
  username: string,
  userModificationParams: UserModificationParams
) {
  const [user, setUser] = useState<User>();
  const { act, isLoading, error } = useActOnAPI(
    'updateUser',
    setUser,
    username,
    userModificationParams
  );

  return { act, user, isLoading, error };
}
