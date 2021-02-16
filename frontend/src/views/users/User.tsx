import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetUser from 'hooks/useGetUser';
import useGetUserPosts from 'hooks/useGetUserPosts';

interface ParamTypes {
  username: string;
}

export const User = () => {
  const { username } = useParams<ParamTypes>();
  const user = useGetUser(username);
  const posts = useGetUserPosts(username);

  // TODO : Remove console log
  // eslint-disable-next-line no-console
  console.log(user);
  // eslint-disable-next-line no-console
  console.log(posts);

  return (
    <div>
      <h1>User view!</h1>
      <h2>Username : {username}</h2>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default User;
