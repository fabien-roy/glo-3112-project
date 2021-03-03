import React, { useEffect, useState } from 'react';
import useDeletePost from 'hooks/posts/useDeletePost';
import { Box, Button, Typography } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from '../SnackbarMessage';

interface DeletePostProps {
  postId?: string | null;
  successAction: (deletedPostId: string | undefined | null) => void;
  cancelAction: () => void;
}

export const DeletePost = (props: DeletePostProps) => {
  const { postId, successAction, cancelAction } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deletePost, isLoading, error: APIError } = useDeletePost(postId!);

  const handleDeletePost = () => {
    deletePost();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!APIError && !isLoading) {
      successAction(postId);
    }
  }, [isLoading]);

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
        <Button color="secondary" onClick={cancelAction}>
          Cancel
        </Button>
        {isLoading && isSubmitting && <LoadingSpinner absolute />}
        {errorMessage}
      </Box>
    </Box>
  );
};

DeletePost.defaultProps = {
  postId: null,
};

export default DeletePost;
