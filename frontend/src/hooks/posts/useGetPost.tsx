import { useState } from 'react';
import { Post } from 'types/posts';
import useAPI from 'hooks/useAPI';

export default function useGetPost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { isLoading, error } = useAPI('getPost', setPost, postId);

  return { post, isLoading, error };
}
