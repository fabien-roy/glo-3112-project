import { useState } from 'react';
import { Post } from 'types/posts';
import useAPI from './useAPI';

export default function useDeletePost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { isLoading, error, fetchData } = useAPI('deletePost', setPost, {
    postId,
  });

  // TODO : Use everything in the hook or remove them
  return { post, isLoading, error, fetchData };
}
