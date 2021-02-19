import React from 'react';
import { Link } from 'react-router-dom';
import useGetPosts from 'hooks/posts/useGetPosts';

export const FeedView = () => {
  const { posts } = useGetPosts();

  // TODO : Remove console log
  // eslint-disable-next-line no-console
  console.log(posts);

  return (
    <div>
      <h1>Feed view!</h1>
      <Link to="/"> Back to home </Link>
    </div>
  );
};

export default FeedView;
