import React from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from 'components/SnackbarMessage';

export const FeedView = () => {
  const { posts, isLoading, error } = useGetPosts();

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch posts" />
  ) : null;

  const content = isLoading ? (
    <LoadingSpinner absolute />
  ) : (
    <PostList posts={posts} />
  );

  return (
    <>
      {content}
      {errorMessage}
    </>
  );
};

export default FeedView;
