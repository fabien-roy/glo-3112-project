import React from 'react';
import { Link } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import useGetPosts from '../../hooks/useGetPosts';
import LoadingSpinner from '../../components/LoadingSpinner';

export function Feed() {
  const { posts, isLoading } = useGetPosts();
  return isLoading ? (
    <LoadingSpinner absolute />
  ) : (
    <div>
      <h1>Feed view!</h1>
      <PostList posts={posts} />
      <Link to="/"> Back to home </Link>
    </div>
  );
}
export default Feed;
