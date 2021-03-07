import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useGetUsers from 'hooks/users/useGetUsers';

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: 'white',
    height: '35px',
  },
}));

export const SearchBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { getUsers, users } = useGetUsers();

  const options: string[] = users?.map((user) => user.username) || [];
  const value: string | null = '';

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
          onChange={(event: any) => {
            if (event.target.value) {
              getUsers(event.target.value);
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
            endAdornment: <>{params.InputProps.endAdornment}</>,
          }}
        />
      )}
    />
  );
};
