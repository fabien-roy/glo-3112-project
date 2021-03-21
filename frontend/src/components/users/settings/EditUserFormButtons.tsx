import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

interface EditUserFormButtonsProps {
  disableSend: boolean;
  delete: () => void;
}

const useStyles = makeStyles(() => ({
  rightButton: {
    marginLeft: '30px',
    color: 'red',
    borderColor: 'red',
    '&:hover': {
      backgroundColor: '#fff8f8',
    },
  },
}));

export function EditUserFormButtons(props: EditUserFormButtonsProps) {
  const classes = useStyles();
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
      <Button
        className={classes.rightButton}
        variant="outlined"
        onClick={props.delete}
      >
        Delete your account
      </Button>
    </Box>
  );
}
