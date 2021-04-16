import React, { useEffect, useState } from 'react';
import SearchTabs from 'components/search/SearchTabs';
import SearchList from 'components/search/SearchList';
import { Box } from '@material-ui/core';
import useGetPosts from 'hooks/posts/useGetPosts';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from 'types/posts';
import LoadingSpinner from 'components/LoadingSpinner';

const getPostDescQueryParams = (query: URLSearchParams): PostQueryParams => ({
  hashtag: undefined,
  description: query.get('value') || undefined,
});

export const SearchView = () => {
  const query = useQuery();
  const [showTab, setShowTab] = useState(0);
  const [listRef, setListRef] = useState(null);

  const {
    posts: descriptionPosts,
    isLoading: descriptionPostsAreLoading,
  } = useGetPosts(getPostDescQueryParams(query));

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollTop = 0;
    }
  });

  const isLoading = descriptionPostsAreLoading;

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      {!isLoading && (
        <SearchList
          tab={showTab}
          descriptionPosts={descriptionPosts.results}
          setListRef={setListRef}
        />
      )}
      {isLoading && <LoadingSpinner absolute />}
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
