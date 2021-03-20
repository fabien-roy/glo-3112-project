import React, { useEffect, useState } from 'react';
import useCreateUserPost from 'hooks/users/useCreateUserPost';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from '../SnackbarMessage';
import { PostForm } from './PostForm';

interface CreatePostFormSubmitValues {
  data: string;
  description: string;
  usertags: string[];
  hashtags: string[];
}
interface CreatePostProps {
  username?: string | null;
  successAction: () => void;
}

export const CreatePost = (props: CreatePostProps) => {
  const { username, successAction } = props;
  const [
    submitValues,
    setSubmitValues,
  ] = useState<CreatePostFormSubmitValues>();

  const {
    createUserPost,
    post,
    isLoading,
    error: APIError,
  } = useCreateUserPost(username);
  const history = useHistory();

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    setSubmitValues(values);
  };

  useEffect(() => {
    if (submitValues) {
      createUserPost({
        reference: submitValues.data,
        description: submitValues.description,
        hashtags: submitValues.hashtags,
        usertags: submitValues.usertags,
      });
    }
  }, [submitValues]);

  useEffect(() => {
    if (!APIError && post) {
      successAction();
      history.push(`/posts/${post.id}`);
    }
  }, [post]);

  const successMessage = post ? (
    <SnackbarMessage
      severity="success"
      description="Post successfully created"
    />
  ) : null;

  const APIErrorMessage = APIError ? (
    <SnackbarMessage severity="error" description="Could not create post" />
  ) : null;

  return (
    <>
      <PostForm onSubmit={onSubmit} action="create" />
      {successMessage}
      {APIErrorMessage}
      {isLoading && submitValues && <LoadingSpinner absolute />}
    </>
  );
};

CreatePost.defaultProps = {
  username: null,
};

export default CreatePost;
