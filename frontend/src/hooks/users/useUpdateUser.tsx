import { useState } from 'react';
import { User, UserModificationParams } from 'types/users';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useUpdateUser(
  username: string,
  userModificationParams: UserModificationParams | undefined
) {
  const [user, setUser] = useState<User>();
  const { act: updateUser, error } = useActOnAPI(
    'updateUser',
    setUser,
    username,
    userModificationParams
  );

  return { updateUser, user, error };
}
