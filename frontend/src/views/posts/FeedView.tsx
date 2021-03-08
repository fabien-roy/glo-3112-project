import React from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from 'components/SnackbarMessage';
import useGetLoggedUser from 'hooks/users/useGetLoggedUser';

export const FeedView = () => {
  const { loggedUser, isLoading: loggedUserIsLoading } = useGetLoggedUser();
  const { posts, isLoading: postsAreLoading, error } = useGetPosts();

  const content =
    posts && loggedUser ? (
      <PostList posts={posts} loggedUser={loggedUser} />
    ) : null;

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch posts" />
  ) : null;

  const loading =
    postsAreLoading || loggedUserIsLoading ? <LoadingSpinner absolute /> : null;

  return (
    <>
      {!postsAreLoading && !loggedUserIsLoading && content}
      {errorMessage}
      {loading}
    </>
  );
};

export default FeedView;
