import React, { useEffect, useState } from 'react';
import useGetPosts from 'hooks/posts/useGetPosts';
import useQuery from 'hooks/useQuery';
import { useToasts } from 'react-toast-notifications';
import { PostQueryParams } from 'types/posts';
import { Box } from '@material-ui/core';
import AlertMessage from 'components/AlertMessage';
import PostList from 'components/posts/PostList';
import _ from 'lodash';

const getQueryParams = (
  query: URLSearchParams,
  before?: string
): PostQueryParams => ({
  hashtag: query.get('hashtag') || undefined,
  description: query.get('description') || undefined,
  before: before || undefined,
});

export const FeedView = () => {
  const query = useQuery();
  const [lastKey, setLastKey] = useState(undefined);
  const { posts, isLoading, error } = useGetPosts(
    getQueryParams(query, lastKey)
  );
  const [fetchedPosts, setFetchedPosts] = useState(posts.results);
  const { addToast } = useToasts();

  useEffect(() => {
    const concatPosts = _.unionBy(fetchedPosts, posts.results, 'id');
    setFetchedPosts(concatPosts);
  }, [lastKey]);

  useEffect(() => {
    if (error) {
      addToast('Could not fetch posts', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [error]);

  const refreshPosts = () => {
    setFetchedPosts([]);
    setLastKey(undefined);
  };

  const loadMorePosts = () => setLastKey(posts.lastKey);

  const content = fetchedPosts ? (
    <PostList
      posts={fetchedPosts}
      loadMore={loadMorePosts}
      hasMore={posts.count > fetchedPosts.length}
      refreshPosts={refreshPosts}
    />
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

  return (
    <>
      {content}
      {noPostsMessage}
    </>
  );
};

export default FeedView;
