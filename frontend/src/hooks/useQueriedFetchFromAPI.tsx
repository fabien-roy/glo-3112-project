import { useEffect } from 'react';
import useActOnAPI from './useActOnAPI';

export default function useQueriedFetchFromAPI(
  method,
  setData,
  queryParams,
  ...params
) {
  const { act, isLoading, error } = useActOnAPI(
    method,
    setData,
    queryParams,
    ...params
  );

  useEffect(() => act({}), [...params]);

  return { isLoading, error };
}
