import { useState } from 'react';
import { Post } from 'types/posts';
import useAPI from 'hooks/useAPI';

export default function useDeletePost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { isLoading, error } = useAPI('deletePost', setPost, {
    postId,
  });

  return { post, isLoading, error };
}
