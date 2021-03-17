import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import { Menu } from 'components/users/settings/Menu';
import useGetLoggedUser from 'hooks/users/useGetLoggedUser';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [value, setValue] = useState(0);
  const { loggedUser } = useGetLoggedUser();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loggedUser) {
    if (isMobile) {
      return <EditUserTab value={value} index={0} loggedUser={loggedUser} />;
    }
    return (
      <Box className={classes.root} mt={2}>
        <Menu handleChange={handleChange} value={value} />

        <EditUserTab value={value} index={0} loggedUser={loggedUser} />
      </Box>
    );
  }

  return null;
};

export default SettingsView;
