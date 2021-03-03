import React, { useEffect, useState } from 'react';
import useUpdatePost from 'hooks/posts/useUpdatePost';
import LoadingSpinner from 'components/LoadingSpinner';
import { Post } from 'types/posts';
import PostForm, { PostSubmitValues } from './PostForm';
import SnackbarMessage from '../SnackbarMessage';

interface EditPostProps {
  postId?: string | null;
  successAction: (newPost: Post) => void;
  existingDescription?: string;
}

export const EditPost = (props: EditPostProps) => {
  const { postId, successAction, existingDescription } = props;
  const [submitValues, setSubmitValues] = useState<PostSubmitValues>();
  const { updatePost, post, isLoading, error: APIError } = useUpdatePost(
    postId!
  );

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
    if (!APIError && post) {
      successAction(post);
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
      <PostForm
        onSubmit={handleSubmit}
        existingDescription={existingDescription}
      />
      {successMessage}
      {errorMessage}
      {isLoading && submitValues && <LoadingSpinner absolute />}
    </>
  );
};

EditPost.defaultProps = {
  postId: null,
  existingDescription: '',
};

export default EditPost;
