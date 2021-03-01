import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { User } from 'types/users';
import { Post } from 'types/posts';
import LoadingSpinner from './LoadingSpinner';
import { UserAvatar } from './users/avatar/UserAvatar';

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: 'white',
    height: '35px',
  },
  option: {
    marginLeft: '10px',
  },
}));

export interface SearchBarProps {
  users: User[];
  posts: Post[];
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const classes = useStyles();
  const history = useHistory();

  const { users, posts, isLoading } = props;

  let options: string[] = [];
  const options2: string[] = [];
  const options3: string[] = [];
  let optionsIcons = {};

  const value: string | null = '';

  if (Array.isArray(users) && users.length > 0) {
    options = Object.keys(users).map((key) => users[key].username) as string[];

    posts.forEach((post) => {
      post.hashtags.forEach((hashtag) => {
        options2.push(hashtag);
      });
    });

    posts.forEach((post) => {
      if (post.description) {
        const keywords = post.description.split(' ');
        keywords.forEach((keyword) => {
          if (
            options2.indexOf(keyword) === -1 &&
            options3.indexOf(keyword) === -1
          ) {
            options3.push(keyword);
          }
        });
      }
    });

    optionsIcons = Object.assign(
      {},
      ...users.map((user) => ({
        [user.username]: { type: 'user', link: user.avatarReference },
      })),
      ...options2.map((option2) => ({
        [option2]: { type: 'hashtag' },
      })),
      ...options3.map((option3) => ({
        [option3]: { type: 'desc' },
      }))
    );

    options = options.concat(options2, options3);

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

  const handleInputChange = (username: string) => {
    if (username !== '') {
      const userRoute = `/users/${username}`;
      history.push(userRoute);
    }
  };

  return (
    <Autocomplete
      id="search-user"
      style={{ width: 300 }}
      options={value ? options : [value, ...options]}
      filterSelectedOptions
      autoHighlight
      autoComplete
      noOptionsText="No user"
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
            {optionsIcons[option].type === 'user' && (
              <UserAvatar
                src={optionsIcons[option].link}
                size="smallestSize"
                username={option}
              />
            )}
            {optionsIcons[option].type === 'hashtag' && <Avatar>#</Avatar>}
            {optionsIcons[option].type === 'desc' && (
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            )}
            <div className={classes.option}>{option}</div>
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          id="search-input"
          style={{ margin: 8 }}
          placeholder="Search user"
          fullWidth
          margin="normal"
          InputLabelProps={{}}
          variant="outlined"
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
