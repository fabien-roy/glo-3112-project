import { useState } from 'react';
import { Post, PostCreationParams } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useCreateUserPost(
  username: string,
  postCreationParams: PostCreationParams
) {
  const [post, setPost] = useState<Post>();
  const { act, isLoading, error } = useActOnAPI(
    'createPost',
    setPost,
    username,
    postCreationParams
  );

  return { act, post, isLoading, error };
}
