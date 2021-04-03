import { useState } from 'react';
import useQueriedFetchFromAPI from 'hooks/useQueriedFetchFromAPI';
import { Hashtag, HashtagQueryParams } from '../../types/hashtags';

// TODO : Refactor to only be used by top hashtags
export default function useGetPosts(queryParams?: HashtagQueryParams) {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const { isLoading, error, act: getHashtags } = useQueriedFetchFromAPI(
    'getHashtags',
    setHashtags,
    queryParams
  );

  return { hashtags, isLoading, error, getHashtags };
}
