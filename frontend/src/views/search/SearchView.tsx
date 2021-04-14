import React, { useEffect, useState } from 'react';
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

export const SearchView = () => {
  const query = useQuery();
  const [showTab, setShowTab] = useState(0);
  const [scrollPage, setScrollPage] = useState(0);

  const [last, setLast] = useState('');
  let numberPerPage = 12; // 12 only for the first load (10 after)

  const getUserQueryParams = (
    username: string,
    after: string,
    limit: number
  ): UserQueryParams => ({
    username,
    after: after || undefined,
    limit: limit || undefined,
  });

  const { users, isLoading: usersAreLoading } = useGetUsers(
    getUserQueryParams(query.get('value'), last, numberPerPage)
  );

  // STRANGE BUG HERE; users is null but results remain
  if (users.count === 0) users.results = [];

  const {
    posts: descriptionPosts,
    isLoading: descriptionPostsAreLoading,
  } = useGetPosts(getPostDescQueryParams(query));

  const { hashtags, isLoading: hashtagsAreLoading } = useGetHashtags(
    getHashtagQueryParams(query)
  );

  const [listItems, setListItems] = useState(users);

  useEffect(() => {
    if (scrollPage === 0) {
      setListItems(users);
      numberPerPage = 10;
    }
    const newListItems = listItems.results.concat(users.results);
    listItems.results = newListItems;
    setListItems(listItems);
    if (listItems.results.length > numberPerPage) {
      setScrollPage(Math.floor(listItems.results.length / numberPerPage));
    }
  }, [users]);

  function fetchMoreListItems() {
    if (listItems.results.length === users.count) return;
    setTimeout(() => {
      setLast(users.lastKey);
    }, 100);
  }

  const isLoading =
    usersAreLoading || descriptionPostsAreLoading || hashtagsAreLoading;

  const content = (
    <Box>
      <SearchTabs showTab={setShowTab} />
      {!isLoading && (
        <SearchList
          tab={showTab}
          users={listItems.results}
          hashtags={hashtags}
          descriptionPosts={descriptionPosts.results}
          fetchMoreListItems={fetchMoreListItems}
          scrollPage={scrollPage}
        />
      )}
      {isLoading && <LoadingSpinner absolute />}
    </Box>
  );

  return <>{content}</>;
};

export default SearchView;
