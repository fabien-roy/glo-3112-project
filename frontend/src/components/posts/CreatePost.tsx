import React, { useState } from 'react';
import useUploadToS3 from 'hooks/images/useUploadToS3';
import useCreateUserPost from 'hooks/users/useCreateUserPost';
import PostForm, { PostSubmitValues } from './PostForm';
import SnackbarMessage from '../SnackbarMessage';

export const CreatePost = () => {
  const [postImageFile, setPostImageFile] = useState();
  const { uploadImage, reference, error: S3Error } = useUploadToS3('posts');
  const { createUserPost, post, error: APIError } = useCreateUserPost();

  const handleSubmit = (values: PostSubmitValues) => {
    uploadImage(postImageFile);
    createUserPost({
      reference,
      description: values.description,
      hashtags: values.hashtags,
      usertags: values.usertags,
    });

    // TODO : Redirect to post
  };

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
    </>
  );
};

export default CreatePost;
