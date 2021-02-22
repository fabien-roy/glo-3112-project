import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useUpdatePost from 'hooks/posts/useUpdatePost';
import PostForm, { PostSubmitValues } from './PostForm';
import SnackbarMessage from '../SnackbarMessage';

interface EditPostProps {
  postId?: string | null;
  successAction: () => void;
}

export const EditPost = (props: EditPostProps) => {
  const { postId, successAction } = props;
  const [submitValues, setSubmitValues] = useState<PostSubmitValues>();
  const { updatePost, post, error: APIError } = useUpdatePost(postId!);
  const history = useHistory();

  const handleSubmit = (values: PostSubmitValues) => {
    setSubmitValues(values);
  };

  useEffect(() => {
    if (submitValues) {
      updatePost({
        description: submitValues.description,
        hashtags: submitValues.hashtags,
        usertags: submitValues.usertags,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitValues]);

  useEffect(() => {
    if (post) {
      successAction();
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const successMessage = post ? (
    <SnackbarMessage
      severity="success"
      description="Post successfully updated"
    />
  ) : null;

  const errorMessage = APIError ? (
    <SnackbarMessage severity="error" description="Could not update post" />
  ) : null;

  return (
    <>
      <PostForm onSubmit={handleSubmit} />
      {successMessage}
      {errorMessage}
    </>
  );
};

EditPost.defaultProps = {
  postId: null,
};

export default EditPost;
