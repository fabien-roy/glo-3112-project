import React, { useState } from 'react';
import SearchTabs from 'components/search/SearchTabs';
import SearchList from 'components/search/SearchList';
import { Box } from '@material-ui/core';
import useGetUsers from 'hooks/users/useGetUsers';
import useGetPosts from 'hooks/posts/useGetPosts';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from '../../types/posts';

const getQueryParams = (query: URLSearchParams): PostQueryParams => ({
  hashtag: query.get('hashtag') || undefined,
  description: query.get('description') || undefined,
});

export const SearchView = () => {
  const [showTab, setShowTab] = useState(0);

  const query = useQuery();
  const queryParams = getQueryParams(query);

  const { users } = useGetUsers();
  const { posts: hashtagPosts } = useGetPosts(queryParams);
  const { posts: descriptionPosts } = useGetPosts(queryParams);

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      <SearchList
        tab={showTab}
        users={users}
        hashtagPosts={hashtagPosts}
        descriptionPosts={descriptionPosts}
      />
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
