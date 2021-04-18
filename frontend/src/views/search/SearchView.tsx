import React, { useEffect, useState } from 'react';
import SearchTabs from 'components/search/SearchTabs';
import SearchList from 'components/search/SearchList';
import { Box } from '@material-ui/core';
import useQuery from 'hooks/useQuery';
import LoadingSpinner from 'components/LoadingSpinner';

export const SearchView = () => {
  const query = useQuery();
  const [showTab, setShowTab] = useState(0);
  const [listRef, setListRef] = useState(null);

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollTop = 0;
    }
  });

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      <SearchList tab={showTab} setListRef={setListRef} />
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
