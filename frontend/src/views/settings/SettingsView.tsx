import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import { Menu } from 'components/users/settings/Menu';
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isMobile) {
    return <EditUserTab value={value} index={0} />;
  }
  return (
    <Box border={1} borderColor="grey.300" className={classes.root} mt={2}>
      <Menu handleChange={handleChange} value={value} />
      <EditUserTab value={value} index={0} />
    </Box>
  );
};

export default SettingsView;
