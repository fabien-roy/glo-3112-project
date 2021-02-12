import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  defaultSize: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

interface UserAvatarProps {
  src?: string;
  size?: string;
  userName: string;
}

UserAvatar.defaultProps = {
  src: null,
  size: null,
};

export default function UserAvatar(props: UserAvatarProps) {
  const classes = useStyles();
  const { src, userName, size } = props;

  if (src) {
    return (
      <div>
        <Avatar className={size || classes.defaultSize} src={src} />
      </div>
    );
  }

  return (
    <div>
      <Avatar className={size || classes.defaultSize}>
        {userName.charAt(0)}
      </Avatar>
    </div>
  );
}
