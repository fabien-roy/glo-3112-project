import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DescriptionIcon from '@material-ui/icons/Description';

import { PostQueryParams } from 'types/posts';
import useGetUsers from '../../hooks/users/useGetUsers';
import useGetPosts from '../../hooks/posts/useGetPosts';

import LoadingSpinner from '../LoadingSpinner';
import { UserAvatar } from '../users/avatar/UserAvatar';

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

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { users, isLoading: usersAreLoading } = useGetUsers();

  const getPostHTQueryParams = (query: string): PostQueryParams => ({
    hashtag: query || undefined,
    description: undefined,
  });

  const getPostDescQueryParams = (query: string): PostQueryParams => ({
    hashtag: undefined,
    description: query || undefined,
  });

  const [query, setQuery] = React.useState('');

  const {
    posts: hashtagPosts,
    isLoading: hashtagPostsAreLoading,
  } = useGetPosts(getPostHTQueryParams(query));

  const {
    posts: descriptionPosts,
    isLoading: descriptionPostsAreLoading,
  } = useGetPosts(getPostDescQueryParams(query));

  const isLoading =
    usersAreLoading && hashtagPostsAreLoading && descriptionPostsAreLoading;

  const { inSearchView } = props;

  let options: string[] = [];
  let optionsDetails = {};
  let usersDetails = {};
  const postsDetails = {};
  const hashtags: string[] = [];

  let value: string | null = null;

  if (!inSearchView) {
    if (Array.isArray(users) && users.length > 0) {
      options = users?.map((user) => user.username) || [];

      usersDetails = Object.assign(
        {},
        ...users.map((user) => ({
          [user.username]: {
            type: 'user',
            link: user.avatarReference,
            details: `${user.firstName} ${user.lastName}`,
          },
        }))
      );
    }

    hashtagPosts.forEach((post) => {
      let numHashtag = 1;
      post.hashtags.forEach((hashtag) => {
        if (hashtag.includes(query)) {
          if (hashtags.indexOf(hashtag) === -1) {
            hashtags.push(hashtag);
          } else {
            numHashtag += 1;
          }
          postsDetails[hashtag] = {
            type: 'hashtag',
            details: numHashtag === 1 ? '1 post' : `${numHashtag} posts`,
          };
        }
      });
    });

    optionsDetails = { ...usersDetails, ...postsDetails };

    options = options.concat(hashtags);

    options.sort((option1, option2) => {
      if (option1.toLowerCase() < option2.toLowerCase()) {
        return -1;
      }
      if (option1.toLowerCase() > option2.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    if (query && query !== '' && descriptionPosts.length > 0) {
      options.splice(0, 1, query);
    }
  }

  const handleInputChange = (option: string) => {
    let searchRoute: string;
    const type = optionsDetails[option]
      ? optionsDetails[option].type
      : 'description';
    if (type === 'user') {
      searchRoute = `/users/${option}`;
      history.push(searchRoute);
    } else if (type === 'hashtag' && options.indexOf(option) > -1) {
      searchRoute = `/posts?hashtag=${option}`;
      history.push(searchRoute);
    } else if (options.indexOf(option) > -1) {
      searchRoute = `/posts?description=${option}`;
      history.push(searchRoute);
    }
    value = null;
  };

  return (
    <Autocomplete
      id="search-user"
      freeSolo
      style={{ width: 300 }}
      options={options}
      clearOnBlur={!inSearchView}
      filterSelectedOptions
      autoHighlight
      autoComplete
      autoSelect={false}
      selectOnFocus={false}
      noOptionsText="No result found"
      value={value}
      clearOnEscape
      onChange={(event: any, newValue: string | null) => {
        if (newValue) {
          handleInputChange(newValue);
        } else if (inSearchView) {
          history.push('/search');
        }
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
                  {descriptionPosts.length} posts
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
              const searchRoute = `/search?value=${event.target.value}`;
              history.push(searchRoute);
            } else {
              setQuery(
                event.target.value !== '' ? event.target.value : undefined
              );
            }
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
