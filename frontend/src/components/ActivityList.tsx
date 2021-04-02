import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, List, ListItem, ListItemAvatar } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { UserAvatar } from './users/avatar/UserAvatar';
import { NotificationEvent } from '../types/notifications';

export interface ActivityListProps {
  notifications: NotificationEvent[];
  close: (event: any) => void;
  open: boolean;
  anchorRef: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highOrderPosition: {
      zIndex: 3000,
    },
    root: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    listItem: {
      marginLeft: '10px',
      marginRight: '10px',
    },
    inline: {
      display: 'inline',
    },
  })
);

export const ActivityList: React.FC<ActivityListProps> = (
  props: ActivityListProps
) => {
  const classes = useStyles();
  return (
    <Box className={classes.highOrderPosition}>
      <Popper open={props.open} anchorEl={props.anchorRef.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={props.close}>
                <List className={classes.root} subheader={<li />}>
                  {props.notifications.map((notification) => (
                    <ul className={classes.ul}>
                      <ListItem key={notification.createdAt.toString()}>
                        <UserAvatar size="small" username={notification.user} />
                        <ListItemText
                          className={classes.listItem}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {notification.user} commented:
                              </Typography>
                              {
                                ' — Do you have Paris recommendations? Have you ever…'
                              }
                            </>
                          }
                        />
                        <Avatar variant="square"> P </Avatar>
                      </ListItem>
                    </ul>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default ActivityList;
