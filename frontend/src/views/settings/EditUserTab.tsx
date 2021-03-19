import React, { useEffect, useState } from 'react';
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
  const [toast, setToast] = useState<JSX.Element | null>();
  const [response, setResponse] = useState({ code: null, description: null });

  useEffect(() => {
    setToast(
      response?.code !== null ? (
        <SnackbarMessage
          severity={response?.code !== 200 ? 'error' : 'success'}
          description={response?.description}
          onClose={() => setResponse(null)}
        />
      ) : null
    );
  }, [response]);

  return loggedUser ? (
    <Box mb={10}>
      <TabPanel value={value} index={index}>
        <EditUserForm loggedUser={loggedUser} setResponse={setResponse} />
      </TabPanel>
      {response && toast}
    </Box>
  ) : null;
}
