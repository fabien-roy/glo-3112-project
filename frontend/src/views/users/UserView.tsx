import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import { HelmetHeader } from 'components/HelmetHeader';
import { UserHeader } from 'components/users/header/UserHeader';
import PostList from 'components/posts/PostList';
import LoadingSpinner from 'components/LoadingSpinner';
import { useToasts } from 'react-toast-notifications';

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
    act: getPosts,
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
          title={`${user.firstName} ${user.lastName} (@${user.username})`}
        />
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
          {!getUserPostsIsLoading && (
            <PostList posts={posts} refreshPosts={getPosts} />
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
