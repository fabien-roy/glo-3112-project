import { useState } from 'react';
import APIService from 'services/APIService';

export default function useActOnAPI(method, setData, ...params) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const act = (...moreParams) => {
    setIsLoading(true);

    APIService[method](...moreParams, ...params)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  return { act, isLoading, error };
}
