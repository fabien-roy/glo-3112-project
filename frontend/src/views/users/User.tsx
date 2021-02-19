import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import PostList from '../../components/posts/PostList';

interface ParamTypes {
  username: string;
}

export const User = () => {
  const { username } = useParams<ParamTypes>();
  const user = useGetUser(username);
  const { posts } = useGetUserPosts(username);
  return (
    <div>
      <h1>User view!</h1>
      <h2>Username : {username}</h2>
      <PostList posts={posts} />
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default User;
