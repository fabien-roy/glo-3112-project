import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { PostCard } from 'components/posts/PostCard';
import useGetPost from 'hooks/posts/useGetPost';
import useGetUsers from 'hooks/users/useGetUsers';
import SnackbarMessage from 'components/SnackbarMessage';

interface ParamTypes {
  postId: string;
}

export const PostView = () => {
  const { postId } = useParams<ParamTypes>();
  const { loggedUser } = useGetUsers();
  const { post, isLoading, error } = useGetPost(postId);

  const content = isLoading ? (
    <LoadingSpinner absolute />
  ) : (
    <Box display="flex">
      <Box margin="auto" marginTop="2vh" maxWidth="800px" width="100%">
        <PostCard
          id={post?._id || ''}
          description={post?.description}
          reference={post?.reference}
          hashtags={post?.hashtags}
          usertags={post?.usertags}
          username={post?.user || ''}
          createdAt={post?.createdAt}
          loggedUser={loggedUser}
        />
      </Box>
    </Box>
  );

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch post" />
  ) : null;

  return (
    <>
      {content}
      {errorMessage}
    </>
  );
};

export default PostView;