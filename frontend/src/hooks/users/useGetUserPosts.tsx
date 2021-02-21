import { useState } from 'react';
import { Post } from 'types/posts';
import useAPI from 'hooks/useAPI';

export default function useGetUserPosts(username: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error } = useAPI('getUserPosts', setPosts, {
    username,
  });

  return { posts, isLoading, error };
}
