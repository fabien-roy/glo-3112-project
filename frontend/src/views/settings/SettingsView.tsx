import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import { Menu } from 'components/users/settings/Menu';
import useGetUsers from 'hooks/users/useGetUsers';
import { EditProfilForm } from 'components/users/settings/EditProfilForm';
import SnackbarMessage from 'components/SnackbarMessage';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [value, setValue] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { users } = useGetUsers();
  const currentUser = users[0];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (currentUser) {
    if (isMobile) {
      return (
        <Box>
          <EditProfilForm
            currentUser={currentUser}
            setError={setIsError}
            setSuccess={setIsSuccess}
          />
          {isError && (
            <SnackbarMessage
              severity="error"
              description="Could not save profil informations!"
              onClose={() => setIsError(false)}
            />
          )}
          {isSuccess && (
            <SnackbarMessage
              severity="success"
              description="Profil informations saved"
              onClose={() => setIsSuccess(false)}
            />
          )}
        </Box>
      );
    }
    return (
      <Box className={classes.root}>
        <Menu handleChange={handleChange} value={value} />

        <EditProfilView value={value} index={0} currentUser={currentUser} />
      </Box>
    );
  }
  return null;
};

export default SettingsView;
