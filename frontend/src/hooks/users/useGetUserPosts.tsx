import { useState } from 'react';
import { Post, PostQueryParams } from 'types/posts';
import { initialPagedResults, PagedResults } from 'types/paged.results';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetUserPosts(
  username: string,
  queryParams?: PostQueryParams
) {
  const [posts, setPosts] = useState<PagedResults<Post>>(initialPagedResults);
  const { isLoading, error, act } = useFetchFromAPI(
    'getUserPosts',
    setPosts,
    username,
    queryParams
  );

  return { posts, isLoading, error, act };
}
