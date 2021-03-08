import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { User } from 'types/users';
import { Post } from 'types/posts';
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
  const {
    posts: descriptionPosts,
    isLoading: descriptionPostsAreLoading,
    getPosts: getDescriptionPosts,
  } = useGetPosts();
  const isLoading =
    usersAreLoading && hashtagPostsAreLoading && descriptionPostsAreLoading;

  const { inSearchView } = props;

  const options: string[] = [];

  // TODO : Currently, this causes a problem since [option] can only be related to written input
  const postsDetails = {
    hashtag: {
      type: 'hashtag',
      details: `${hashtagPosts.length} posts`,
    },
    description: {
      type: 'description',
      details: `${descriptionPosts.length} posts`,
    },
  };
  let optionsDetails = {
    ...postsDetails,
  };

  let value: string | null = '';

  if (!inSearchView) {
    let usersDetails = {};

    if (users.length > 0) {
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

    optionsDetails = {
      ...usersDetails,
      ...postsDetails,
    };

    options.sort((option1, option2) => {
      if (option1.toLowerCase() < option2.toLowerCase()) {
        return -1;
      }
      if (option1.toLowerCase() > option2.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    options.concat('hashtag', 'description');
  }

  const handleInputChange = (newValue: string) => {
    value = newValue;

    getUsers({ username: value });
    getHashtagPosts({ hashtag: value });
    getDescriptionPosts({ description: value });
  };

  // TODO : Handle select is triggered automatically, weirdly
  const handleSelect = (option: string) => {
    if (!inSearchView) {
      // TODO : Find a way to see if selected item is user, hashtag or description
      if (option !== '') {
        if (optionsDetails[option]?.type === 'user') {
          const userRoute = `/users/${option}`;
          history.push(userRoute);
        } else if (optionsDetails.hashtag?.type === 'hashtag') {
          const searchRoute = `/search?${optionsDetails.hashtag?.type}=${option}`;
          history.push(searchRoute);
        } else if (optionsDetails.description?.type === 'description') {
          const searchRoute = `/search?${optionsDetails.description?.type}=${option}`;
          history.push(searchRoute);
        }
      }
    }
  };

  return (
    <Autocomplete
      id="search-user"
      freeSolo={inSearchView}
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
            {/* TODO : Those options probably do not work with new logic */}
            {optionsDetails.hashtag?.type === 'hashtag' && <Avatar>#</Avatar>}
            {optionsDetails.description?.type === 'description' && (
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            )}
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
            if (event.target.value) {
              handleSelect(event.target.value);
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
