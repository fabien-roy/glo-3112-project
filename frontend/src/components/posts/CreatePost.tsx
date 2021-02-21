import React, { useState } from "react";
import PostForm from "./PostForm";
import useUploadToS3 from 'hooks/images/useUploadToS3';
import useCreateUserPost from 'hooks/users/useCreateUserPost';

// TODO : Implement CreatePost
export const CreatePost = () => {
  const [postImageFile, setPostImageFile] = useState();
  const { uploadImage, reference, error: S3Error } = useUploadToS3('posts');
  // const { act, post, isLoading, error: APIError } = useCreateUserPost();

  const handleSubmit = () => {
    // TODO : Handle submit
  }

  return (
    <>
      <PostForm onSubmit={handleSubmit} setFile={setPostImageFile} />
    </>
  );
};

export default CreatePost;
