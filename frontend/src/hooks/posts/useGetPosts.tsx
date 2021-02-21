import { useState } from 'react';
import { Post } from 'types/posts';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error } = useFetchFromAPI('getPosts', setPosts);

  return { posts, isLoading, error };
}
