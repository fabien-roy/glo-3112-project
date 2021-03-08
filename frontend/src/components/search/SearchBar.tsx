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
  const { posts, isLoading: postsAreLoading, getPosts } = useGetPosts();
  const isLoading = usersAreLoading && postsAreLoading;

  const { inSearchView } = props;

  const hashtagPosts = posts;
  const descriptionPosts = posts;
  let options: string[] = [];
  let optionsDetails = {};
  let usersDetails = {};
  let postsDetails = {};
  const hashtags: string[] = [];
  const keywords: string[] = [];

  let value: string | null = '';

  if (!inSearchView) {
    if (Array.isArray(users) && users.length > 0) {
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

    postsDetails = Object.assign(
      {},
      ...hashtags.map((hashtag) => ({
        [hashtag]: { type: 'hashtag', details: `${hashtags.length} posts` },
      })),
      ...keywords.map((keyword) => ({
        [keyword]: { type: 'description', details: `${keywords.length} posts` },
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

  const handleInputChange = (newValue: any) => {
    value = newValue;
    console.log(value);
  };

  const handleSelect = (option: string) => {
    if (!inSearchView) {
      if (option !== '' && optionsDetails[option].type === 'user') {
        const userRoute = `/users/${option}`;
        history.push(userRoute);
      } else {
        const userRoute = `/search?${optionsDetails[option].type}=${option}`;
        history.push(userRoute);
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
          handleSelect(newValue);
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
            {optionsDetails[option].type === 'description' && (
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
            handleInputChange(event);
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
