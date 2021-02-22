import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Menu } from 'components/users/settings/Menu';
import useGetUsers from 'hooks/users/useGetUsers';
import { EditUserTab } from './EditUserTab';

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
  const { loggedUser } = useGetUsers();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return loggedUser ? (
    <Box className={classes.root} mt={2}>
      <Menu handleChange={handleChange} value={value} />

      <EditUserTab value={value} index={0} loggedUser={loggedUser} />
    </Box>
  ) : null;
};

export default SettingsView;
