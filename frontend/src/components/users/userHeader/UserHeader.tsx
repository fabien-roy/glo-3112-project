import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { UserInfo } from '../userInfo/UserInfo';
import { UserAvatar } from '../UserAvatar';
import { UserInfoHeader } from '../userInfo/UserInfoHeader';
import { UserInfoStats } from '../userInfo/UserInfoStats';
import { UserInfoDescription } from '../userInfo/UserInfoDescription';
import { UserHeaderDesktop } from './UserHeaderDesktop';
import { UserHeaderMobile } from './UserHeaderMobile';

interface UserStats {
  totalPost: number;
  totalFollowers: number;
  totalFollowing: number;
}

interface UserHeaderProps {
  username: string;
  stats: UserStats;
  fullname: string;
  description: string;
}

const useStyles = makeStyles((theme) => ({
  desktopAvatarSize: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  tabletteAvatarSize: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export function UserHeader(props: UserHeaderProps) {
  const classes = useStyles();
  const { username, stats, fullname, description } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablette = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return isMobile ? (
    <UserHeaderMobile {...props} />
  ) : (
    <Box display="flex">
      <UserHeaderDesktop
        {...props}
        avatarSize={
          isTablette ? classes.tabletteAvatarSize : classes.desktopAvatarSize
        }
        avatarHorizantalPadding={isTablette ? 5 : 10}
      />
    </Box>
  );
}
