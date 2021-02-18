import { useState, useEffect } from 'react';
import APIService from 'services/APIService';

export default function useAPI(method, setData, ...params) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);

    APIService[method](...params)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  // TODO : Fix exhaustive-deps warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchData(), []);

  return { isLoading, error, fetchData };
}
