import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export interface SnackbarMessageProps {
  severity: 'success' | 'info' | 'warning' | 'error';
  description: string;
}

export const SnackbarMessage: React.FC<SnackbarMessageProps> = (
  props: SnackbarMessageProps
) => {
  const { severity, description } = props;

  return (
    <Snackbar open autoHideDuration={6000}>
      <Alert severity={severity}>{description}</Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
