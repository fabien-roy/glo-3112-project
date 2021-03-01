import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import useGetUsers from 'hooks/users/useGetUsers';
import { UserHeader } from 'components/users/header/UserHeader';
import PostList from 'components/posts/PostList';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from 'components/SnackbarMessage';

interface ParamTypes {
  username: string;
}

export const UserView = () => {
  const { username } = useParams<ParamTypes>();
  const { user, error: userError } = useGetUser(username);
  const { posts, error: postsError } = useGetUserPosts(username);
  const { loggedUser } = useGetUsers({});

  const userErrorMessage = userError ? (
    <SnackbarMessage severity="error" description="Could not fetch user" />
  ) : null;

  const postsErrorMessage = postsError ? (
    <SnackbarMessage severity="error" description="Could not fetch posts" />
  ) : null;

  const content =
    !user || !posts ? (
      <LoadingSpinner absolute />
    ) : (
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
            createdAt={new Date(user.createdAt)}
          />
        </Box>
        <Box>
          <PostList posts={posts} loggedUser={loggedUser} />
        </Box>
      </Box>
    );

  return (
    <>
      {content}
      {userErrorMessage}
      {postsErrorMessage}
    </>
  );
};

export default UserView;
