import React from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from 'components/SnackbarMessage';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from 'types/posts';

const getQueryParams = (query: URLSearchParams): PostQueryParams => ({
  hashtag: query.get('hashtag') || undefined,
  description: query.get('description') || undefined,
});

export const FeedView = () => {
  const query = useQuery();
  const { posts, isLoading: postsAreLoading, error } = useGetPosts(
    getQueryParams(query)
  );

  const content = posts ? <PostList posts={posts} /> : null;

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch posts" />
  ) : null;

  const loading = postsAreLoading ? <LoadingSpinner absolute /> : null;

  return (
    <>
      {!postsAreLoading && content}
      {errorMessage}
      {loading}
    </>
  );
};

export default FeedView;
