import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import { UserHeader } from 'components/users/header/UserHeader';

interface ParamTypes {
  username: string;
}

export const UserView = () => {
  const { username } = useParams<ParamTypes>();
  const { user } = useGetUser(username);
  const { posts } = useGetUserPosts(username);

  return (
    <div>
      <UserHeader
        username={user?.username!}
        stats={{
          totalPost: posts?.length,
        }}
        fullname={`${user?.firstName!} ${user?.lastName!}`}
        description={user?.description!}
        avatarSrc={user?.avatarReference!}
      />
      <h1>User view!</h1>
      <h2>Username : {username}</h2>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default UserView;
