import { useState } from 'react';
import { User, UserQueryParams } from 'types/users';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';

export default function useGetUsers(queryParams?: UserQueryParams) {
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, act: getUsers } = useQueriedFetchFromAPI(
    'getUsers',
    setUsers,
    queryParams
  );

  return { users, isLoading, getUsers };
}
