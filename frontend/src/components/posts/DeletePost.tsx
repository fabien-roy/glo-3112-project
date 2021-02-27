import React from 'react';
import { useHistory } from 'react-router-dom';
import useDeletePost from 'hooks/posts/useDeletePost';
import { Box, Button, Typography } from '@material-ui/core';
import SnackbarMessage from '../SnackbarMessage';

interface DeletePostProps {
  postId?: string | null;
  successAction: () => void;
}

export const DeletePost = (props: DeletePostProps) => {
  const { postId, successAction } = props;
  const { deletePost, error: APIError } = useDeletePost(postId!);
  const history = useHistory();

  const handleDeletePost = () => {
    deletePost();
    successAction();
    history.push('/posts');
  };

  const errorMessage = APIError ? (
    <SnackbarMessage severity="error" description="Could not delete post" />
  ) : null;

  return (
    <Box p={2}>
      <Box my={1}>
        <Typography>Are you sure?</Typography>
      </Box>
      <Box my={1}>
        <Button color="primary" onClick={handleDeletePost}>
          Yes
        </Button>
        <Button color="secondary" onClick={successAction}>
          Cancel
        </Button>
        {errorMessage}
      </Box>
    </Box>
  );
};

DeletePost.defaultProps = {
  postId: null,
};

export default DeletePost;
