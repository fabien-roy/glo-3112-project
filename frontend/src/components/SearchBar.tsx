import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { User } from 'types/users';
import LoadingSpinner from './LoadingSpinner';

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: 'white',
    height: '35px',
  },
}));

export interface SearchBarProps {
  users: User[];
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const classes = useStyles();
  const history = useHistory();

  const { users, isLoading } = props;

  let options: string[] = [];
  const value: string | null = '';

  if (Array.isArray(users) && users.length > 0) {
    options = Object.keys(users).map((key) => users[key].username) as string[];
    options.sort((user1, user2) => {
      if (user1 < user2) {
        return -1;
      }
      if (user1 > user2) {
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
