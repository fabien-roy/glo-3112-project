import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import { HelmetHeader } from 'components/HelmetHeader';
import { UserHeader } from 'components/users/header/UserHeader';
import LoadingSpinner from 'components/LoadingSpinner';
import { useToasts } from 'react-toast-notifications';
import PostListUsers from 'components/posts/PostListUsers';

interface ParamTypes {
  username: string;
}

export const UserView = () => {
  const { username } = useParams<ParamTypes>();
  const { user, isLoading: getUserIsLoading, error: userError } = useGetUser(
    username
  );
  const {
    posts,
    isLoading: getUserPostsIsLoading,
    error: postsError,
    getPosts,
  } = useGetUserPosts(username);
  const { addToast } = useToasts();

  useEffect(() => {
    if (userError) {
      addToast('Could not fetch user', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    if (postsError) {
      addToast('Could not fetch posts', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [userError, postsError]);

  const loading =
    getUserIsLoading || getUserPostsIsLoading ? (
      <LoadingSpinner absolute />
    ) : null;

  const content =
    user && posts ? (
      <Box mt={2}>
        <HelmetHeader
          title={`UGRAM - ${user.firstName} ${user.lastName} (@${user.username})`}
        />
        <Box my={2}>
          <UserHeader
            username={user.username}
            stats={{
              totalPost: posts.count,
            }}
            fullname={`${user.firstName} ${user.lastName}`}
            description={user.description}
            avatarSrc={user.avatarReference}
            createdAt={new Date(user.createdAt)}
          />
        </Box>
        <Box>
          {!getUserPostsIsLoading && (
            <PostListUsers
              posts={posts.results}
              refreshPosts={getPosts}
              username={user.username}
            />
          )}
        </Box>
      </Box>
    ) : null;

  return (
    <>
      {content}
      {loading}
    </>
  );
};

export default UserView;
