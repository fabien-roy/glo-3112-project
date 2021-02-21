import { useState } from 'react';
import { User, UserCreationParams } from 'types/users';
import useAPI from 'hooks/useAPI';

export default function useCreateUser(userCreationParams: UserCreationParams) {
  const [user, setUser] = useState<User>();
  const { isLoading, error } = useAPI(
    'createUser',
    setUser,
    userCreationParams
  );

  return { user, isLoading, error };
}
