import React from 'react';
import { purple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { UserInfoStatsMobile } from './UserInfoStatsMobile';

interface userStats {
  totalPost: number;
  // TODO: enable for remise 2
  // totalFollowers: number;
  // totalFollowing: number;
}

interface UserInfoStatsProps {
  stats: userStats;
}

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionMobile: {
    display: 'block',
    backgroundColor: purple[50],
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export function UserInfoStats(props: UserInfoStatsProps) {
  const classes = useStyles();
  const { stats } = props;
  // TODO: enable for remise 2
  // const { totalPost, totalFollowers, totalFollowing } = stats;
  //
  // return (
  //   <Box>
  //     <Box id="userInfoStats" mb={2} className={classes.sectionDesktop}>
  //       <Box id="userInfoStatsPosts" component="span" mr={5}>
  //         <b>{totalPost}</b> post{totalPost > 0 && <span>s</span>}
  //       </Box>
  //       <Box id="userInfoStatsFollowers" component="span" mr={5}>
  //         <b>{totalFollowers}</b> follower{totalFollowers > 0 && <span>s</span>}
  //       </Box>
  //       <Box id="userInfoStatsFollowing" component="span">
  //         <b>{totalFollowing}</b> following
  //       </Box>
  //     </Box>
  //     <Box className={classes.sectionMobile} mx={-2} mt={2}>
  //       <UserInfoStatsMobile
  //         totalPost={totalPost}
  //         totalFollowers={totalFollowers}
  //         totalFollowing={totalFollowing}
  //       />
  //     </Box>
  //   </Box>
  // );

  const { totalPost } = stats;

  return (
    <Box>
      <Box id="userInfoStats" mb={2} className={classes.sectionDesktop}>
        <Box id="userInfoStatsPosts" component="span" mr={5}>
          <b>{totalPost}</b> post{totalPost > 0 && <span>s</span>}
        </Box>
      </Box>
      <Box className={classes.sectionMobile} mx={-2} mt={2}>
        <UserInfoStatsMobile totalPost={totalPost} />
      </Box>
    </Box>
  );
}
