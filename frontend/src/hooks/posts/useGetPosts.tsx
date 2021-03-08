import { useState } from 'react';
import { Post } from 'types/posts';
import useFetchFromAPI from '../useFetchFromAPI';

export default function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error, act: getPosts } = useFetchFromAPI(
    'getPosts',
    setPosts
  );

  return { posts, isLoading, error, getPosts };
}
