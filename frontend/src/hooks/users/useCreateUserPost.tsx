import { useState } from 'react';
import { User } from 'types/users';
import { Post } from 'types/posts';
import useActOnAPI from 'hooks/useActOnAPI';

export default function useCreateUserPost() {
  const [loggedUser] = useState<User>();
  const [post, setPost] = useState<Post>();

  const { act: createUserPost, isLoading, error } = useActOnAPI(
    'createUserPost',
    setPost,
    loggedUser?.username
  );

  // TODO : If isLoading is not used, remove
  return { createUserPost, post, isLoading, error };
}
