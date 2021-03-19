import { useState } from 'react';
import APIService from 'services/APIService';

export default function useActOnAPI(method, setData, ...params) {
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const act = (...actParams) => {
    setIsLoading(true);

    APIService[method](...params, ...actParams)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  return { act, isLoading, error, setError };
}
