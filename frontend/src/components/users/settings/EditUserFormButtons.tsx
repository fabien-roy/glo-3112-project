import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

interface EditUserFormButtonsProps {
  disableSend: boolean;
  delete: () => void;
}

export function EditUserFormButtons(props: EditUserFormButtonsProps) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Button
        disabled={props.disableSend}
        variant="contained"
        color="primary"
        type="submit"
      >
        Send
      </Button>
      <Button variant="outlined" color="primary" onClick={props.delete}>
        Delete your account
      </Button>
    </Box>
  );
}
