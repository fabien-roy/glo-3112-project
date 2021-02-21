import { useState } from 'react';
import { Post, PostModificationParams } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useUpdatePost(
  postId: string,
  postModificationParams: PostModificationParams
) {
  const [post, setPost] = useState<Post>();
  const { act, isLoading, error } = useActOnAPI(
    'updatePost',
    setPost,
    postId,
    postModificationParams
  );

  return { act, post, isLoading, error };
}
