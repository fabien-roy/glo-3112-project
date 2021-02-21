import { useState } from 'react';
import { Post, PostModificationParams } from 'types/posts';
import useAPI from 'hooks/useAPI';

export default function useUpdatePost(
  postModificationParams: PostModificationParams
) {
  const [post, setPost] = useState<Post>();
  const { isLoading, error } = useAPI(
    'updatePost',
    setPost,
    postModificationParams
  );

  return { post, isLoading, error };
}
