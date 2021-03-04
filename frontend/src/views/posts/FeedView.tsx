import React from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from 'components/SnackbarMessage';
import useGetLoggedUser from 'hooks/users/useGetLoggedUser';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  hashtag?: string;
  description?: string;
}

export const FeedView = () => {
  const { loggedUser, isLoading: getLoggedUserIsLoading } = useGetLoggedUser();
  const { posts, isLoading: getPostsIsLoading, error } = useGetPosts(
    useParams<ParamTypes>()
  );

  const content =
    posts && loggedUser ? (
      <PostList posts={posts} loggedUser={loggedUser} />
    ) : null;

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch posts" />
  ) : null;

  const loading =
    getPostsIsLoading || getLoggedUserIsLoading ? (
      <LoadingSpinner absolute />
    ) : null;

  return (
    <>
      {content}
      {errorMessage}
      {loading}
    </>
  );
};

export default FeedView;
