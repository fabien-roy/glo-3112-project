import React, { useEffect } from 'react';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from 'types/posts';
import { useToasts } from 'react-toast-notifications';
import PostListFeed from 'components/posts/PostListFeed';

const getQueryParams = (query: URLSearchParams): PostQueryParams => ({
  hashtag: query.get('hashtag') || undefined,
  description: query.get('description') || undefined,
});

export const FeedView = () => {
  const query = useQuery();
  const { posts, isLoading: postsAreLoading, error, getPosts } = useGetPosts(
    getQueryParams(query)
  );
  const { addToast } = useToasts();

  const content = posts ? (
    <PostListFeed posts={posts.results} refreshPosts={getPosts} />
  ) : null;

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
