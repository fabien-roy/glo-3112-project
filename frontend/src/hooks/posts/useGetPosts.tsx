import { useState } from 'react';
import { Post, PostQueryParams } from 'types/posts';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

// TODO : When refactoring SearchBar, this hook will be separated from regular useGetPosts
export default function useGetPosts(queryParams: PostQueryParams) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error } = useFetchFromAPI(
    'getPosts',
    setPosts,
    queryParams
  );

  return { posts, isLoading, error };
}
