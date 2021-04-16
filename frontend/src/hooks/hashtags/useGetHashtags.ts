import { useState } from 'react';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';
import { initialPagedResults, PagedResults } from 'types/paged.results';
import { Hashtag, HashtagQueryParams } from '../../types/hashtags';

export default function useGetHashtags(queryParams?: HashtagQueryParams) {
  const [hashtags, setHashtags] = useState<PagedResults<Hashtag>>(
    initialPagedResults
  );
  const { isLoading, act: getHashtags } = useQueriedFetchFromAPI(
    'getHashtags',
    setHashtags,
    queryParams
  );

  return { hashtags, isLoading, getHashtags };
}
