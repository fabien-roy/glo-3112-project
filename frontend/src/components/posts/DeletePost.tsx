import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useDeletePost from 'hooks/posts/useDeletePost';
import { Button, Typography } from '@material-ui/core';
import SnackbarMessage from '../SnackbarMessage';

interface DeletePostProps {
  postId?: string | null;
  successAction: () => void;
}

export const DeletePost = (props: DeletePostProps) => {
  const { postId, successAction } = props;
  const [deletionAffirmation, setDeletionAffirmation] = useState<boolean>(
    false
  );
  const { deletePost, post, error: APIError } = useDeletePost(postId!);
  const history = useHistory();

  useEffect(() => {
    if (deletionAffirmation) {
      deletePost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletionAffirmation]);

  useEffect(() => {
    if (post) {
      successAction();
      history.push('/posts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const successMessage = post ? (
    <SnackbarMessage
      severity="success"
      description="Post successfully deleted"
    />
  ) : null;

  const errorMessage = APIError ? (
    <SnackbarMessage severity="error" description="Could not update post" />
  ) : null;

  return (
    <>
      <Typography>Are you sure?</Typography>
      <Button color="primary" onClick={() => setDeletionAffirmation(true)}>
        Yes
      </Button>
      <Button color="secondary" onClick={successAction}>
        Cancel
      </Button>
      {successMessage}
      {errorMessage}
    </>
  );
};

DeletePost.defaultProps = {
  postId: null,
};

export default DeletePost;
