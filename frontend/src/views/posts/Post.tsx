import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

interface ParamTypes {
  postId: string;
}

export const Post = () => {
  const { postId } = useParams<ParamTypes>();

  return (
    <div>
      <h1>Post view!</h1>
      <h2>Post ID : {postId}</h2>
      <Link to="/"> Back to home </Link>
    </div>
  );
};
export default Post;
