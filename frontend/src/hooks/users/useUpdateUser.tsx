import { useState } from 'react';
import { User, UserModificationParams } from 'types/users';
import useAPI from 'hooks/useAPI';

export default function useUpdateUser(
  userModificationParams: UserModificationParams
) {
  const [user, setUser] = useState<User>();
  const { isLoading, error } = useAPI(
    'updateUser',
    setUser,
    userModificationParams
  );

  return { user, isLoading, error };
}
