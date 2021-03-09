import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

import LoadingSpinner from '../LoadingSpinner';
import { UserAvatar } from '../users/avatar/UserAvatar';
import useGetUsers from '../../hooks/users/useGetUsers';
import useGetPosts from '../../hooks/posts/useGetPosts';

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
  const { users, isLoading: usersAreLoading, getUsers } = useGetUsers();
  const {
    posts: hashtagPosts,
    isLoading: hashtagPostsAreLoading,
    getPosts: getHashtagPosts,
  } = useGetPosts();
  const isLoading = usersAreLoading && hashtagPostsAreLoading;

  const { inSearchView } = props;

  let options: string[] = [];
  let optionsDetails = {};
  let usersDetails = {};
  let postsDetails = {};
  const hashtags: string[] = [];
  const keywords: string[] = [];

  const value: string | null = '';

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
      post.hashtags.forEach((hashtag) => {
        if (hashtags.indexOf(hashtag) === -1) {
          hashtags.push(hashtag);
        }
      });
    });

    postsDetails = Object.assign(
      {},
      ...hashtags.map((hashtag) => ({
        [hashtag]: { type: 'hashtag', details: `${hashtags.length} posts` },
      }))
    );

    optionsDetails = { ...usersDetails, ...postsDetails };

    options = options.concat(hashtags, keywords);

    options.sort((option1, option2) => {
      if (option1.toLowerCase() < option2.toLowerCase()) {
        return -1;
      }
      if (option1.toLowerCase() > option2.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  const handleInputChange = (option: string) => {
    if (!inSearchView) {
      if (option !== '' && optionsDetails[option].type === 'user') {
        const userRoute = `/users/${option}`;
        history.push(userRoute);
      } else {
        // TO DO : Put the appropriate route to load the feedview containing the selected hashtag
        const userRoute = `/search/${optionsDetails[option].type}/${option}`;
        history.push(userRoute);
      }
    }
  };

  return (
    <Autocomplete
      id="search-user"
      freeSolo
      style={{ width: 300 }}
      options={value ? options : [value, ...options]}
      filterSelectedOptions
      autoComplete
      noOptionsText="No result found"
      value={value}
      clearOnEscape
      onChange={(event: any, newValue: string | null) => {
        if (newValue) {
          handleInputChange(newValue);
        }
      }}
      renderOption={(option) => {
        return (
          <>
            {optionsDetails[option].type === 'user' && (
              <UserAvatar
                src={optionsDetails[option].link}
                size="small"
                username={option}
              />
            )}
            {optionsDetails[option].type === 'hashtag' && <Avatar>#</Avatar>}
            <div className={classes.optionText}>
              {option}
              <br />
              <div className={classes.optionDetails}>
                {optionsDetails[option].details}
              </div>
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
              // TO DO: Put the appropriate route to filter SearchView lists with the input param
              // const userRoute = ??
              // history.push(userRoute);
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
