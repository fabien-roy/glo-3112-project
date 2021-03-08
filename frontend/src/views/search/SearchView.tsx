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
  // TODO : Hooks go into infinite mode if we use twice getPosts. This must be fixed.
  const { posts: hashtagPosts } = useGetPosts(queryParams);
  /*
  const {
    posts: descriptionPosts,
    getPosts: getDescriptionPosts,
  } = useGetPosts();
  */

  // const descriptionQuery = query.get('description');

  /*
  if (descriptionQuery) {
    getDescriptionPosts({ description: descriptionQuery });
  }
  */

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      <SearchList
        tab={showTab}
        users={users}
        hashtagPosts={hashtagPosts}
        descriptionPosts={[]}
      />
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
