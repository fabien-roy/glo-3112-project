import React from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';

export const FeedView = () => {
  const { posts, isLoading } = useGetPosts();

  return isLoading ? <LoadingSpinner absolute /> : <PostList posts={posts} />;
};

export default FeedView;
