import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import { UserHeader } from 'components/users/header/UserHeader';
import PostList from 'components/posts/PostList';
import LoadingSpinner from 'components/LoadingSpinner';

interface ParamTypes {
  username: string;
}

export const UserView = () => {
  const { username } = useParams<ParamTypes>();
  const { user } = useGetUser(username);
  const { posts } = useGetUserPosts(username);

  return user && posts ? (
    <Box mt={2}>
      <Box my={2}>
        <UserHeader
          username={user.username}
          stats={{
            totalPost: posts.length,
          }}
          fullname={`${user.firstName} ${user.lastName}`}
          description={user.description}
          avatarSrc={user.avatarReference}
        />
      </Box>
      <Box>
        <PostList posts={posts} />
      </Box>
    </Box>
  ) : (
    <LoadingSpinner absolute />
  );
};

export default UserView;
