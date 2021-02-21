import { useState } from 'react';
import { User } from 'types/users';
import { Post, PostCreationParams } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useCreateUserPost(postCreationParams: PostCreationParams) {
  const [loggedUser] = useState<User>();
  const [post, setPost] = useState<Post>();

  const { act, isLoading, error } = useActOnAPI(
    'createUserPost',
    setPost,
    loggedUser?.username,
    postCreationParams
  );

  // TODO : If isLoading is not used, remove
  // TODO : If post is not used, remove
  return { act, post, isLoading, error };
}
