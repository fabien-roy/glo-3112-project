import React from 'react';
import Box from '@material-ui/core/Box';
import UserInfoHeader from './UserInfoHeader';
import UserInfoStats from './UserInfoStats';
import UserInfoDescription from './UserInfoDescription';

interface UserStats {
  totalPost: number;
  totalFollowers: number;
  totalFollowing: number;
}

interface UserInfoProps {
  username: string;
  stats: UserStats;
  fullname: string;
  description: string;
}

export default function UserInfo(props: UserInfoProps) {
  const { username, stats, fullname, description } = props;

  return (
    <Box>
      <UserInfoHeader username={username} />
      <UserInfoStats stats={stats} />
      <UserInfoDescription fullname={fullname} description={description} />
    </Box>
  );
}
