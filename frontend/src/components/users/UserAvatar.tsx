import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  medium: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

type userAvatarProps = {
  src?: string;
  userName: string;
};

const UserAvatar = (props: userAvatarProps) => {
  const classes = useStyles();
  const { src } = props;
  const { userName } = props;

  if (src) {
    return (
      <div>
        <Avatar className={classes.medium} src={src} />
      </div>
    );
  }

  return (
    <div>
      <Avatar className={classes.medium}>{userName.charAt(0)}</Avatar>
    </div>
  );
};

UserAvatar.defaultProps = {
  src: null,
};

export default UserAvatar;
