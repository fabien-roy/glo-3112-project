import { useState } from 'react';
import { Post } from 'types/posts';
import { initialPagedResults, PagedResults } from 'types/paged.results';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetUserPosts(username: string) {
  const [posts, setPosts] = useState<PagedResults<Post>>(initialPagedResults);
  const { isLoading, error, act } = useFetchFromAPI(
    'getUserPosts',
    setPosts,
    username
  );

  return { posts, isLoading, error, act };
}
