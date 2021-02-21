import { useState } from 'react';
import { Post } from 'types/posts';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetUserPosts(username: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error } = useFetchFromAPI(
    'getUserPosts',
    setPosts,
    username
  );

  return { posts, isLoading, error };
}
