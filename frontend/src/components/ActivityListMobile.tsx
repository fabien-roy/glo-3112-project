import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { ActivityListItems } from './ActivityListItems';
import { NotificationEvent } from '../types/notifications';

export interface ActivityListProps {
  notifications: NotificationEvent[];
  close: any;
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

export const ActivityListMobile: React.FC<ActivityListProps> = (
  props: ActivityListProps
) => {
  const classes = useStyles();
  const { notifications, close, open } = props;
  const handleClose = () => {
    close();
  };

  return (
    <div>
      <Dialog
        fullScreen
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Activity
            </Typography>
          </Toolbar>
        </AppBar>
        <ActivityListItems
          notifications={notifications}
          close={close}
          isMobile
        />
      </Dialog>
    </div>
  );
};
export default ActivityListMobile;
