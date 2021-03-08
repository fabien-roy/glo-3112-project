import React, { useState } from 'react';
import useGetPosts from 'hooks/posts/useGetPosts';
import SearchTabs from 'components/search/SearchTabs';
import SearchList from 'components/search/SearchList';
import { Box } from '@material-ui/core';
import useGetUsers from '../../hooks/users/useGetUsers';

export const SearchView = () => {
  const [showTab, setShowTab] = useState(0);

  // TODO: Add the query param
  const { posts } = useGetPosts();
  const { users } = useGetUsers();

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      <SearchList tab={showTab} users={users} posts={posts} />
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
