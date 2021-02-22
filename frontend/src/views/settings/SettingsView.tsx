import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Menu } from 'components/users/settings/Menu';
import useGetUsers from 'hooks/users/useGetUsers';
import { EditProfilView } from './EditProfilView';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
}));

export const SettingsView = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { users } = useGetUsers();
  const currentUser = users[0];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return currentUser ? (
    <Box className={classes.root}>
      <Menu handleChange={handleChange} value={value} />

      <EditProfilView value={value} index={0} currentUser={currentUser} />
    </Box>
  ) : null;
};

export default SettingsView;
// const currentUser = {
//   username: 'username',
//   email: 'username@test.ca',
//   phoneNumber: '514-444-4444',
//   firstName: 'FirstName',
//   lastName: 'LastName',
//   description: 'This is a user description',
//   avatarReference:
//     'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
// };
