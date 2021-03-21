import React, { useEffect, useState } from 'react';
import useDeletePost from 'hooks/posts/useDeletePost';
import { Box, Button, Typography } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { useToasts } from 'react-toast-notifications';

interface DeletePostProps {
  postId?: string | null;
  successAction: (deletedPostId: string | undefined | null) => void;
  cancelAction: () => void;
}

export const DeletePost = (props: DeletePostProps) => {
  const { postId, successAction, cancelAction } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deletePost, isLoading, error: APIError } = useDeletePost(postId);
  const { addToast } = useToasts();

  const handleDeletePost = () => {
    deletePost();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!APIError && !isLoading) {
      addToast('Post deleted successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
      successAction(postId);
    } else if (APIError) {
      addToast('Could not delete post', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [isLoading, APIError]);

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
      </Box>
    </Box>
  );
};

DeletePost.defaultProps = {
  postId: null,
};

export default DeletePost;
