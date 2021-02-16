import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { User } from 'types/users';
import useGetUsers from '../hooks/useGetUsers';

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: 'white',
    height: '35px',
  },
}));

export function SearchBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<User[]>([]);
  const [value, setValue] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [users] = useGetUsers();

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    } else if (Array.isArray(users) && users.length > 0) {
      setOptions(Object.keys(users).map((key) => users[key]) as User[]);
    } else {
      setLoading(true);
    }
  }, [open, users]);

  const history = useHistory();
  const handleInputChange = (user: string) => {
    const currentUser = user;
    if (currentUser !== '') {
      const currenRoute = `/users/${currentUser}`;
      history.push(currenRoute);
      setOptions([]);
      setValue(null);
    }
  };

  return (
    <Autocomplete
      id="user-dropdown"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={(event: any, newValue: User | null) => {
        setValue(newValue);
        if (newValue) {
          handleInputChange(newValue.username);
        }
      }}
      inputValue=""
      getOptionLabel={(option) => option.username}
      options={options}
      loading={loading}
      blurOnSelect
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          id="outlined-full-width"
          style={{ margin: 8 }}
          placeholder="Search user"
          fullWidth
          margin="normal"
          InputLabelProps={{}}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
            className: classes.input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
