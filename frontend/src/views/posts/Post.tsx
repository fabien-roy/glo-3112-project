import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetPost from 'hooks/posts/useGetPost';

interface ParamTypes {
  postId: string;
}

export const Post = () => {
  const { postId } = useParams<ParamTypes>();
  const post = useGetPost(postId);

  // TODO : Remove console log
  // eslint-disable-next-line no-console
  console.log(post);

  return (
    <div>
      <h1>Post view!</h1>
      <h2>Post ID : {postId}</h2>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default Post;
