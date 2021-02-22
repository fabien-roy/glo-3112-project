import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { User } from 'types/users';
import { TabPanel } from 'components/users/settings/TabPanel';
import { EditProfilForm } from 'components/users/settings/EditProfilForm';
import SnackbarMessage from 'components/SnackbarMessage';

interface EditProfilViewProps {
  value: number;
  index: number;
  currentUser: User;
}

// TODO : This is not a view, this is a component
// TODO : Rename EditProfil for EditUser (everywhere)
export function EditProfilView(props: EditProfilViewProps) {
  const { value, index } = props;
  const { currentUser } = props;
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return currentUser ? (
    <Box>
      <TabPanel value={value} index={index}>
        <EditProfilForm
          currentUser={currentUser}
          setError={setIsError}
          setSuccess={setIsSuccess}
        />
      </TabPanel>
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
  ) : null;
}
