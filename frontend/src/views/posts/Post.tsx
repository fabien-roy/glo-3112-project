import React from 'react';
import { Link } from 'react-router-dom';

export const Post = () => {
  return (
    <div>
      <h1>Post view!</h1>
      <Link to="/"> Back to home </Link>
    </div>
  );
};
export default Post;
