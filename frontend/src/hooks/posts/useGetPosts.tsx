import { useState } from 'react';
import { Post } from 'types/posts';
import useAPI from 'hooks/useAPI';

export default function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error } = useAPI('getPosts', setPosts);

  return { posts, isLoading, error };
}
