import { useState } from 'react';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';
import { HashtagQueryParams } from 'types/hashtags';
import { initialSearchResults, SearchResults } from 'types/search.results';

export default function useGetPosts(queryParams?: HashtagQueryParams) {
  const [searchResults, setSearchResults] = useState<SearchResults>(
    initialSearchResults
  );
  const { isLoading, error, act: getSearch } = useQueriedFetchFromAPI(
    'getSearch',
    setSearchResults,
    queryParams
  );

  return { searchResults, isLoading, error, getSearch };
}
