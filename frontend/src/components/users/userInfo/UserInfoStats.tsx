import React from 'react';
import Box from '@material-ui/core/Box';

interface userStats {
  totalPost: number;
  totalFollowers: number;
  totalFollowing: number;
}

interface UserInfoStatsProps {
  stats: userStats;
}

export default function UserInfoStats(props: UserInfoStatsProps) {
  const { stats } = props;
  const { totalPost, totalFollowers, totalFollowing } = stats;

  return (
    <Box id="userInfoStats" mb={2}>
      <Box id="userInfoStatsPosts" component="span" mr={5}>
        <b>{totalPost}</b> post{totalPost > 0 && <span>s</span>}
      </Box>
      <Box id="userInfoStatsFollowers" component="span" mr={5}>
        <b>{totalFollowers}</b> follower{totalFollowers > 0 && <span>s</span>}
      </Box>
      <Box id="userInfoStatsFollowing" component="span">
        <b>{totalFollowing}</b> following
      </Box>
    </Box>
  );
}
