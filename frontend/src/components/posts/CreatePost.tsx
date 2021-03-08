import React, { useEffect, useState } from 'react';
import useUploadToS3 from 'hooks/images/useUploadToS3';
import useCreateUserPost from 'hooks/users/useCreateUserPost';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import PostForm, { PostSubmitValues } from './PostForm';
import SnackbarMessage from '../SnackbarMessage';

interface CreatePostProps {
  username?: string | null;
  successAction: () => void;
}

export const CreatePost = (props: CreatePostProps) => {
  const { username, successAction } = props;
  const [postImageFile, setPostImageFile] = useState();
  const [submitValues, setSubmitValues] = useState<PostSubmitValues>();
  const { uploadImage, reference, error: S3Error } = useUploadToS3('posts');
  const {
    createUserPost,
    post,
    isLoading,
    error: APIError,
  } = useCreateUserPost(username!);
  const history = useHistory();

  const handleSubmit = (values: PostSubmitValues) => {
    uploadImage(postImageFile);
    setSubmitValues(values);
  };

  useEffect(() => {
    if (reference && submitValues) {
      createUserPost({
        reference,
        description: submitValues.description,
        hashtags: submitValues.hashtags,
        usertags: submitValues.usertags,
      });
    }
  }, [reference, submitValues]);

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

  const S3ErrorMessage = S3Error ? (
    <SnackbarMessage severity="error" description="Could not upload image" />
  ) : null;

  const APIErrorMessage = APIError ? (
    <SnackbarMessage severity="error" description="Could not create post" />
  ) : null;

  return (
    <>
      <PostForm onSubmit={handleSubmit} setFile={setPostImageFile} />
      {successMessage}
      {S3ErrorMessage}
      {APIErrorMessage}
      {isLoading && submitValues && <LoadingSpinner absolute />}
    </>
  );
};

CreatePost.defaultProps = {
  username: null,
};

export default CreatePost;
