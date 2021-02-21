import React, { useEffect, useState } from 'react';
import useUploadToS3 from 'hooks/images/useUploadToS3';
import useCreateUserPost from 'hooks/users/useCreateUserPost';
import PostForm, { PostSubmitValues } from './PostForm';
import SnackbarMessage from '../SnackbarMessage';

export const CreatePost = () => {
  const [postImageFile, setPostImageFile] = useState();
  const [submitValues, setSubmitValues] = useState<PostSubmitValues>();
  const { uploadImage, reference, error: S3Error } = useUploadToS3('posts');
  const { createUserPost, post, error: APIError } = useCreateUserPost();

  const handleSubmit = (values: PostSubmitValues) => {
    uploadImage(postImageFile);
    setSubmitValues(values);
  };

  useEffect(() => {
    if (submitValues) {
      createUserPost({
        reference,
        description: submitValues.description,
        hashtags: submitValues.hashtags,
        usertags: submitValues.usertags,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, submitValues]);

  // TODO : Redirect to post if successfully created

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
