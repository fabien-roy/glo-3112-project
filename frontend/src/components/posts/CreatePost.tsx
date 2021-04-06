import React, { useEffect, useState } from 'react';
import useCreateUserPost from 'hooks/users/useCreateUserPost';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { useToasts } from 'react-toast-notifications';
import { ROUTE_PATHS } from 'router/Config';
import { makeStyles } from '@material-ui/core';
import { theme } from 'layouts/Theme';
import { PostForm } from './PostForm';

interface CreatePostFormSubmitValues {
  data: string;
  description: string;
  usertags: string[];
  hashtags: string[];
}

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));
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
  const { addToast } = useToasts();

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
        data: submitValues.data,
        description: submitValues.description,
        hashtags: submitValues.hashtags,
        usertags: submitValues.usertags,
      });
    }
  }, [submitValues]);

  useEffect(() => {
    if (!APIError && post) {
      successAction();
      addToast('Post created successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push(ROUTE_PATHS.post(post.id));
    } else if (APIError) {
      addToast('Could not create post', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [post, APIError]);

  return (
    <>
      <PostForm onSubmit={onSubmit} action="create" />
      {isLoading && submitValues && <LoadingSpinner absolute />}
    </>
  );
};

CreatePost.defaultProps = {
  username: null,
};

export default CreatePost;
