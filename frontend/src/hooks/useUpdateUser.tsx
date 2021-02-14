import { useState } from 'react';
import { User, UserModificationParams } from 'types/users';
import useAPI from './useAPI';

// TODO : Use this hook in appropriate component
export default function useUpdateUser(
  userModificationParams: UserModificationParams
) {
  const [user, setUser] = useState<User>();
  const [isLoading, error, fetchData] = useAPI(
    'updateUser',
    setUser,
    userModificationParams
  );

  // TODO : Use everything in the hook or remove them
  return [user, isLoading, error, fetchData];
}
