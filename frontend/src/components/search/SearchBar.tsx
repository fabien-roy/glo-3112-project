import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DescriptionIcon from '@material-ui/icons/Description';

import { ROUTE_PATHS } from 'router/Config';

import { PostQueryParams } from 'types/posts';
import { UserQueryParams } from 'types/users';

import useGetUsers from '../../hooks/users/useGetUsers';
import useGetPosts from '../../hooks/posts/useGetPosts';
import useGetHashtags from '../../hooks/hashtags/useGetHashtags';

import LoadingSpinner from '../LoadingSpinner';
import { UserAvatar } from '../users/avatar/UserAvatar';
import { HashtagQueryParams } from '../../types/hashtags';

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: 'white',
    height: '35px',
  },
  optionText: {
    fontSize: '16px',
    fontWeight: 'bold',
    justifyContent: 'left',
    marginLeft: '15px',
  },
  optionDetails: {
    fontWeight: 'normal',
    fontSize: '13px',
    justifyContent: 'left',
  },
}));

export interface SearchBarProps {
  inSearchView: boolean;
}

let dropdownOpen = false;

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const classes = useStyles();
  const history = useHistory();

  const getHashtagQueryParams = (query: string): HashtagQueryParams => ({
    like: query || undefined,
  });

  const getPostDescQueryParams = (query: string): PostQueryParams => ({
    hashtag: undefined,
    description: query || undefined,
  });

  const getUserQueryParams = (query: string): UserQueryParams => ({
    username: query || undefined,
  });

  const [query, setQuery] = React.useState('');
  let inputValue = query;

  const { users, isLoading: usersAreLoading } = useGetUsers(
    getUserQueryParams(query)
  );

  const { hashtags, isLoading: hashtagsAreLoading } = useGetHashtags(
    getHashtagQueryParams(query)
  );

  const {
    posts: descriptionPosts,
    isLoading: descriptionPostsAreLoading,
  } = useGetPosts(getPostDescQueryParams(query));

  const isLoading =
    usersAreLoading && hashtagsAreLoading && descriptionPostsAreLoading;

  const { inSearchView } = props;

  let options: string[] = [];
  let optionsDetails = {};
  let usersDetails = {};
  const postsDetails = {};

  let value: string | null = null;

  if (dropdownOpen === false) {
    inputValue = '';
  }

  if (!inSearchView) {
    if (Array.isArray(users.results) && users.results.length > 0) {
      options = users.results.map((user) => user.username) || [];

      usersDetails = Object.assign(
        {},
        ...users.results.map((user) => ({
          [user.username]: {
            type: 'user',
            link: user.avatarReference,
            details: `${user.firstName} ${user.lastName}`,
          },
        }))
      );
    }

    hashtags.forEach((hashtag) => {
      postsDetails[hashtag.name] = {
        type: 'hashtag',
        details: hashtag.count === 1 ? '1 post' : `${hashtag.count} posts`,
      };
    });

    optionsDetails = { ...usersDetails, ...postsDetails };

    options = options.concat(hashtags.map((hashtag) => hashtag.name));

    options.sort((option1, option2) => {
      if (option1.toLowerCase() < option2.toLowerCase()) {
        return -1;
      }
      if (option1.toLowerCase() > option2.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    if (query && query !== '' && descriptionPosts.count > 0) {
      options.unshift(`Results for "${query}"`);
    }
  }

  const handleInputChange = (option: string) => {
    const type = optionsDetails[option]
      ? optionsDetails[option].type
      : 'description';
    if (type === 'user') {
      history.push(ROUTE_PATHS.user(option));
    } else if (type === 'hashtag' && options.indexOf(option) > -1) {
      history.push(ROUTE_PATHS.feed(`hashtag=${option}`));
    } else if (options.indexOf(option) > -1) {
      let optionstring = option.replace('Results for ', '');
      optionstring = optionstring.replace(/"/g, '');
      history.push(ROUTE_PATHS.feed(`description=${optionstring}`));
    }
    value = null;
    inputValue = '';
  };

  return (
    <Autocomplete
      id="search-user"
      freeSolo={inSearchView}
      style={{ width: 300 }}
      options={options}
      clearOnBlur={!inSearchView}
      filterSelectedOptions
      autoHighlight
      noOptionsText="No result found"
      value={value}
      inputValue={inputValue}
      clearOnEscape
      onChange={(event: any, newValue: string | null) => {
        if (newValue) {
          handleInputChange(newValue);
        } else if (inSearchView) {
          history.push(ROUTE_PATHS.search());
        }
      }}
      onOpen={() => {
        setQuery('');
        dropdownOpen = true;
      }}
      onClose={() => {
        dropdownOpen = false;
      }}
      renderOption={(option) => {
        const type = optionsDetails[option]
          ? optionsDetails[option].type
          : 'description';
        return (
          <>
            {type === 'user' && (
              <UserAvatar
                src={optionsDetails[option].link}
                size="small"
                username={option}
              />
            )}
            {type === 'hashtag' && <Avatar>#</Avatar>}
            {!inSearchView && type === 'description' && (
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            )}
            <div className={classes.optionText}>
              {option}
              <br />
              {(type === 'user' || type === 'hashtag') && (
                <div className={classes.optionDetails}>
                  {optionsDetails[option].details}
                </div>
              )}
              {type === 'description' && (
                <div className={classes.optionDetails}>
                  {descriptionPosts.count} posts
                </div>
              )}
            </div>
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          id="search-input"
          style={{ margin: 8 }}
          placeholder="Search"
          fullWidth
          margin="normal"
          InputLabelProps={{}}
          variant="outlined"
          onChange={(event: any) => {
            if (inSearchView) {
              history.push(ROUTE_PATHS.search(`value=${event.target.value}`));
            }
            setQuery(event.target.value !== '' ? event.target.value : '');
          }}
          InputProps={{
            ...params.InputProps,
            className: classes.input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {isLoading ? <LoadingSpinner /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
