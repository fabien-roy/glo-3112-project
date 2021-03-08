import React, { useState } from 'react';
import SearchTabs from 'components/search/SearchTabs';
import SearchList from 'components/search/SearchList';
import { Box } from '@material-ui/core';
import useGetUsers from 'hooks/users/useGetUsers';
import useGetPosts from 'hooks/posts/useGetPosts';
import useQuery from 'hooks/useQuery';

export const SearchView = () => {
  const [showTab, setShowTab] = useState(0);

  const { users } = useGetUsers();
  // TODO : Hooks go into infinite mode if we use twice getPosts. This must be fixed.
  const { posts: hashtagPosts, getPosts: getHashtagPosts } = useGetPosts();
  /*
  const {
    posts: descriptionPosts,
    getPosts: getDescriptionPosts,
  } = useGetPosts();
  */

  const query = useQuery();
  const hashtagQuery = query.get('hashtag');
  // const descriptionQuery = query.get('description');

  if (hashtagQuery) {
    getHashtagPosts({ hashtag: hashtagQuery });
  }

  /*
  if (descriptionQuery) {
    getDescriptionPosts({ description: descriptionQuery });
  }
  */

  console.log(users);
  console.log(hashtagPosts);

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
