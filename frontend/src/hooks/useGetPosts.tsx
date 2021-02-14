import { useState, useEffect } from 'react';
import APIService from '../services/APIService';
import { Post } from '../types/posts';

export default function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO : Can we generify this into another hook?
  const retrievePosts = () => {
    setIsLoading(true);

    APIService.getPosts()
      .then((response) => setPosts(response.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => retrievePosts(), []);

  // TODO : Use everything in the hook or remove them
  return [posts, isLoading, error, retrievePosts];
}
