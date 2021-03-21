import { useState } from 'react';
import { Post } from 'types/posts';
import useFetchFromAPI from 'hooks/useFetchFromAPI';

export default function useGetPost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { isLoading, error, act } = useFetchFromAPI('getPost', setPost, postId);

  return { post, isLoading, error, act };
}
