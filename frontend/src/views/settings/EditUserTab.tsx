import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { User } from 'types/users';
import { TabPanel } from 'components/users/settings/TabPanel';
import { EditUserForm } from 'components/users/settings/EditUserForm';
import SnackbarMessage from 'components/SnackbarMessage';

interface EditProfilTabProps {
  value: number;
  index: number;
  loggedUser: User;
}

export function EditUserTab(props: EditProfilTabProps) {
  const { value, index } = props;
  const { loggedUser } = props;
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return loggedUser ? (
    <Box mb={10}>
      <TabPanel value={value} index={index}>
        <EditUserForm
          loggedUser={loggedUser}
          setError={setIsError}
          setSuccess={setIsSuccess}
        />
      </TabPanel>
      {isError && (
        <SnackbarMessage
          severity="error"
          description="Could not save user information"
          onClose={() => setIsError(false)}
        />
      )}
      {isSuccess && (
        <SnackbarMessage
          severity="success"
          description="User information saved"
          onClose={() => setIsSuccess(false)}
        />
      )}
    </Box>
  ) : null;
}
