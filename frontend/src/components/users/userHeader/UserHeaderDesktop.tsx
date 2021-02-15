import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from '../UserAvatar';
import { UserInfoHeader } from '../userInfo/UserInfoHeader';
import { UserInfoStats } from '../userInfo/UserInfoStats';
import { UserInfoDescription } from '../userInfo/UserInfoDescription';

interface UserStats {
  totalPost: number;
  totalFollowers: number;
  totalFollowing: number;
}

interface UserHeaderDesktopProps {
  username: string;
  stats: UserStats;
  fullname: string;
  description: string;
  avatarSize: string;
  avatarHorizantalPadding: number;
}

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export function UserHeaderDesktop(props: UserHeaderDesktopProps) {
  const classes = useStyles();
  const {
    username,
    stats,
    fullname,
    description,
    avatarSize,
    avatarHorizantalPadding,
  } = props;

  return (
    <Box display="flex">
      <Box mr={2} px={avatarHorizantalPadding}>
        <UserAvatar username={username} size={avatarSize} id="UserHeaderAvatar" />
      </Box>
      <Box>
        <UserInfoHeader username={username} />
        <UserInfoStats stats={stats} />
        <UserInfoDescription fullname={fullname} description={description} />
      </Box>
    </Box>
  );
}
