import { useState } from 'react';
import { Post } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useDeletePost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { act: deletePost, isLoading, error } = useActOnAPI(
    'deletePost',
    setPost,
    postId
  );

  // TODO : If isLoading is not used, remove
  return { deletePost, post, isLoading, error };
}
