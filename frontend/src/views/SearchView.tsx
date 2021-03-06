import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostList from 'components/posts/PostList';
import useGetPosts from 'hooks/posts/useGetPosts';
import SearchTabs from 'components/search/SearchTabs';
import UsersList from 'components/search/UsersList';
import { Box } from '@material-ui/core';
import useGetUsers from '../hooks/users/useGetUsers';

interface ParamTypes {
  searchword: string;
}

export const SearchView = () => {
  const { searchword } = useParams<ParamTypes>();
  const currentTab = searchword && searchword !== '' ? 1 : 0;
  const [showTab, setShowTab] = useState(currentTab);

  // TO DO: Add the query param
  const { posts } = useGetPosts();
  const { users } = useGetUsers();

  const content = (
    <Box>
      <SearchTabs currentTab={currentTab} showTab={setShowTab} />
      {showTab === 0 && <UsersList users={users} />}
      {showTab === 1 && <PostList posts={posts} />}
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
