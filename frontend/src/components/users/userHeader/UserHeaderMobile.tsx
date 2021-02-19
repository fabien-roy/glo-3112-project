import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from '../UserAvatar';
import { UserInfoHeader } from '../userInfo/UserInfoHeader';
import { UserInfoDescription } from '../userInfo/UserInfoDescription';
import { UserInfoStats } from '../userInfo/UserInfoStats';

interface UserStats {
  totalPost: number;
}

export interface UserHeaderMobileProps {
  username: string;
  stats: UserStats;
  fullname: string;
  description?: string | null;
  avatarSrc?: string | null;
}

UserHeaderMobile.defaultProps = {
  description: null,
  avatarSrc: null,
};

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export function UserHeaderMobile(props: UserHeaderMobileProps) {
  const classes = useStyles();
  const { username, stats, fullname, description, avatarSrc } = props;

  return (
    <Box>
      <Box display="flex" mb={2}>
        <Box mr={2} px={2}>
          <UserAvatar
            username={username}
            size={classes.avatarSize}
            src={avatarSrc}
          />
        </Box>
        <Box>
          <UserInfoHeader username={username} />
        </Box>
      </Box>
      <Box>
        <UserInfoDescription fullname={fullname} description={description} />
        <UserInfoStats stats={stats} />
      </Box>
    </Box>
  );
}
