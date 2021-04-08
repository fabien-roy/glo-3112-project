import React, { useEffect } from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from 'types/posts';
import { useToasts } from 'react-toast-notifications';
import { Box } from '@material-ui/core';
import AlertMessage from 'components/AlertMessage';

const getQueryParams = (query: URLSearchParams): PostQueryParams => ({
  hashtag: query.get('hashtag') || undefined,
  description: query.get('description') || undefined,
});

export const FeedView = () => {
  const query = useQuery();
  const { posts, isLoading, error, getPosts } = useGetPosts(
    getQueryParams(query)
  );
  const { addToast } = useToasts();

  const content = posts ? (
    <PostList posts={posts.results} refreshPosts={getPosts} />
  ) : null;

  const noPostsMessage =
    posts.count === 0 && !isLoading ? (
      <Box
        justifyContent="center"
        display="flex"
        mx="auto"
        my="2vh"
        width="20vw"
      >
        <AlertMessage severity="info" title="No posts" />
      </Box>
    ) : null;

  const loading = isLoading && !posts ? <LoadingSpinner absolute /> : null;

  useEffect(() => {
    if (error) {
      addToast('Could not fetch posts', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [error]);

  return (
    <>
      {content}
      {noPostsMessage}
      {loading}
    </>
  );
};

export default FeedView;
