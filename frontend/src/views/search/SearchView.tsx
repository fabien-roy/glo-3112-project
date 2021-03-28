import React, { useState } from 'react';
import SearchTabs from 'components/search/SearchTabs';
import SearchList from 'components/search/SearchList';
import { Box } from '@material-ui/core';
import useGetUsers from 'hooks/users/useGetUsers';
import useGetPosts from 'hooks/posts/useGetPosts';
import useQuery from 'hooks/useQuery';
import { PostQueryParams } from 'types/posts';
import { UserQueryParams } from 'types/users';
import LoadingSpinner from 'components/LoadingSpinner';
import useGetHashtags from '../../hooks/hashtags/useGetHashtags';
import { HashtagQueryParams } from '../../types/hashtags';

const getHashtagQueryParams = (query: URLSearchParams): HashtagQueryParams => ({
  like: query.get('value') || undefined,
});

const getPostDescQueryParams = (query: URLSearchParams): PostQueryParams => ({
  hashtag: undefined,
  description: query.get('value') || undefined,
});

const getUserQueryParams = (query: URLSearchParams): UserQueryParams => ({
  username: query.get('value') || undefined,
});

export const SearchView = () => {
  const [showTab, setShowTab] = useState(0);

  const query = useQuery();

  const { users, isLoading: usersAreLoading } = useGetUsers(
    getUserQueryParams(query)
  );
  const {
    posts: descriptionPosts,
    isLoading: descriptionPostsAreLoading,
  } = useGetPosts(getPostDescQueryParams(query));

  const { hashtags, isLoading: hashtagsAreLoading } = useGetHashtags(
    getHashtagQueryParams(query)
  );

  const isLoading =
    usersAreLoading || descriptionPostsAreLoading || hashtagsAreLoading;

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      {!isLoading && (
        <SearchList
          tab={showTab}
          users={users}
          hashtags={hashtags}
          descriptionPosts={descriptionPosts.results}
        />
      )}
      {isLoading && <LoadingSpinner absolute />}
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
