import { useState } from 'react';
import { Post } from 'types/posts';
import useAPI from 'hooks/useAPI';

// TODO : Shouldn't getUser also obtain user's posts?
export default function useGetUserPosts(username: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error, fetchData } = useAPI('getUserPosts', setPosts, {
    username,
  });

  // TODO : Use everything in the hook or remove them
  return { posts, isLoading, error, fetchData };
}
