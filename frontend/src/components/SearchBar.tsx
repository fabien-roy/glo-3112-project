import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { User } from '../views/users/UserProps';

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: 'white',
    height: '35px',
  },
}));

/* function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
} */

export function SearchBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<User[]>([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState<User | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const users: User[] = [
      {
        username: 'Annie',
        email: 'TestUser1@ugram.com',
        phoneNumber: '450-666-7777',
        firstName: 'Test',
        lastName: 'User1',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
      {
        username: 'AnnieA',
        email: 'TestUser1@ugram.com',
        phoneNumber: '450-666-7777',
        firstName: 'Test',
        lastName: 'User1',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
      {
        username: 'AnnieAA',
        email: 'TestUser1@ugram.com',
        phoneNumber: '450-666-7777',
        firstName: 'Test',
        lastName: 'User1',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
      {
        username: 'ArianeTest',
        email: 'TestUser1@ugram.com',
        phoneNumber: '450-666-7777',
        firstName: 'Test',
        lastName: 'User1',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
      {
        username: 'JoeBlo',
        email: 'TestUser2@ugram.com',
        phoneNumber: '450-664-7777',
        firstName: 'Test',
        lastName: 'User2',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
      {
        username: 'blackdiamond_4',
        email: 'TestUser2@ugram.com',
        phoneNumber: '450-664-7777',
        firstName: 'Test',
        lastName: 'User2',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
      {
        username: 'nataliegaron',
        email: 'TestUser2@ugram.com',
        phoneNumber: '450-664-7777',
        firstName: 'Test',
        lastName: 'User2',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
      {
        username: 'donaldtrump',
        email: 'TestUser2@ugram.com',
        phoneNumber: '450-664-7777',
        firstName: 'Test',
        lastName: 'User2',
        description: '',
        avatarReference:
          'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
      },
    ];

    // (async () => {
    // const response = await fetch(
    //  'https://country.register.gov.uk/records.json?page-size=5000'
    // );
    // sleep(3000); // For demo purposes.
    // const users = await response.json();

    if (active) {
      setOptions(Object.keys(users).map((key) => users[key]) as User[]);
    }
    // })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const history = useHistory();
  const handleInputChange = (user: string) => {
    setInputValue(user);
    const currentUser = user;
    if (currentUser !== '') {
      const currenRoute = `/users/${currentUser}`;
      history.push(currenRoute);
      setOptions([]);
      setInputValue('');
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
