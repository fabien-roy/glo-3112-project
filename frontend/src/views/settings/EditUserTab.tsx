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
  const [response, setResponse] = useState({ code: null, description: null });

  const toast =
    response?.code !== null ? (
      <SnackbarMessage
        severity={response?.code < 300 ? 'success' : 'error'}
        description={response?.description}
        // onClose={() => setIsError(undefined)}
      />
    ) : null;

  return loggedUser ? (
    <Box mb={10}>
      <TabPanel value={value} index={index}>
        <EditUserForm loggedUser={loggedUser} />
      </TabPanel>
      {toast}
    </Box>
  ) : null;
}
