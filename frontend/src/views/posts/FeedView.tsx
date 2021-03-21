import React, { useEffect } from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from 'types/posts';
import { useToasts } from 'react-toast-notifications';

const getQueryParams = (query: URLSearchParams): PostQueryParams => ({
  hashtag: query.get('hashtag') || undefined,
  description: query.get('description') || undefined,
});

export const FeedView = () => {
  const query = useQuery();
  const { posts, isLoading: postsAreLoading, error } = useGetPosts(
    getQueryParams(query)
  );
  const { addToast } = useToasts();

  const content = posts ? <PostList posts={posts} /> : null;

  const loading = postsAreLoading ? <LoadingSpinner absolute /> : null;

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
      {!postsAreLoading && content}
      {loading}
    </>
  );
};

export default FeedView;
