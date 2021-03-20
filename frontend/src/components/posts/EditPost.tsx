import React, { useEffect, useState } from 'react';
import useUpdatePost from 'hooks/posts/useUpdatePost';
import LoadingSpinner from 'components/LoadingSpinner';
import { Post } from 'types/posts';
import PostForm from './PostForm';
import SnackbarMessage from '../SnackbarMessage';

interface EditPostFormSubmitValues {
  description: string;
  hashtags: string[];
  usertags: string[];
}
interface EditPostProps {
  postId?: string | null;
  successAction: (newPost: Post) => void;
  existingDescription?: string;
  existingUsertags?: string[];
}

export const EditPost = (props: EditPostProps) => {
  const {
    postId,
    successAction,
    existingDescription,
    existingUsertags,
  } = props;
  const [submitValues, setSubmitValues] = useState<EditPostFormSubmitValues>();
  const { updatePost, post, isLoading, error: APIError } = useUpdatePost(
    postId!
  );

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
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
        onSubmit={onSubmit}
        existingDescription={existingDescription}
        existingUsertags={existingUsertags}
        action="edit"
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
  existingUsertags: [],
};

export default EditPost;
