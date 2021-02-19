import { useState } from 'react';
import { Post, PostModificationParams } from 'types/posts';
import useAPI from 'hooks/useAPI';

// TODO : Use this hook in appropriate component
export default function useUpdatePost(
  postModificationParams: PostModificationParams
) {
  const [post, setPost] = useState<Post>();
  const { isLoading, error, fetchData } = useAPI(
    'updatePost',
    setPost,
    postModificationParams
  );

  // TODO : Use everything in the hook or remove them
  return { post, isLoading, error, fetchData };
}
