import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import LoadingSpinner from 'components/LoadingSpinner';
import SnackbarMessage from 'components/SnackbarMessage';

interface ParamTypes {
  search: string;
}

export const SearchView = () => {
  const { posts, isLoading, error } = useGetPosts();
  const content = isLoading ? (
    <LoadingSpinner absolute />
  ) : (
    <PostList posts={posts} />
  );

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch posts" />
  ) : null;

  return (
    <>
      {content}
      {errorMessage}
    </>
  );
};

export default SearchView;
