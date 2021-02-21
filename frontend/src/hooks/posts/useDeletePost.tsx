import { useState } from 'react';
import { Post } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useDeletePost(postId: string) {
  const [post, setPost] = useState<Post>();
  const { act, isLoading, error } = useActOnAPI('deletePost', setPost, postId);

  return { act, post, isLoading, error };
}
