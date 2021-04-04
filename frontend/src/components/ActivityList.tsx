import React from 'react';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ActivityListItems } from './ActivityListItems';
import { NotificationEvent } from '../types/notifications';

export interface ActivityListProps {
  notifications: NotificationEvent[];
  close: (event: any) => void;
  open: boolean;
  anchorRef: any;
}

export const ActivityList: React.FC<ActivityListProps> = (
  props: ActivityListProps
) => {
  const { notifications, close, open, anchorRef } = props;
  return (
    <ClickAwayListener onClickAway={close}>
      <Popper open={open} anchorEl={anchorRef.current}>
        <Paper>
          <ActivityListItems
            notifications={notifications}
            close={close}
            isMobile={false}
          />
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
};
export default ActivityList;
