import React from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from 'components/SnackbarMessage';
import useGetLoggedUser from 'hooks/users/useGetLoggedUser';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from 'types/posts';

const getPostQueryParams = (query: URLSearchParams): PostQueryParams => {
  const hashtag = query.get('hashtag') || undefined;
  const description = query.get('description') || undefined;

  return { hashtag, description };
};

export const FeedView = () => {
  const { loggedUser, isLoading: getLoggedUserIsLoading } = useGetLoggedUser();
  const query = useQuery();

  const { posts, isLoading: getPostsIsLoading, error } = useGetPosts(
    getPostQueryParams(query)
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
      {!getPostsIsLoading && !getLoggedUserIsLoading && content}
      {errorMessage}
      {loading}
    </>
  );
};

export default FeedView;
