import { useState } from 'react';
import { Post, PostQueryParams } from 'types/posts';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';

export default function useGetPosts(queryParams?: PostQueryParams) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isLoading, error, act: getPosts } = useQueriedFetchFromAPI(
    'getPosts',
    setPosts,
    queryParams
  );

  return { posts, isLoading, error, getPosts };
}
