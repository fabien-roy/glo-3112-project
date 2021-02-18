import { useState } from 'react';
import { Post } from 'types/posts';
import useAPI from './useAPI';

export default function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error, fetchData } = useAPI('getPosts', setPosts);

  // TODO : Use everything in the hook or remove them
  return { posts, isLoading, error, fetchData };
}
