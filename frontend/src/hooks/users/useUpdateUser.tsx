import { useState } from 'react';
import { User, UserModificationParams } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useUpdateUser(
  userModificationParams: UserModificationParams
) {
  const [user, setUser] = useState<User>();
  const { act, isLoading, error } = useActOnAPI(
    'updateUser',
    setUser,
    userModificationParams
  );

  return { act, user, isLoading, error };
}
