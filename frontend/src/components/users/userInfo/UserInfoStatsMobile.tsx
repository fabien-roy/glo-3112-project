import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// TODO: enable for remise 2
// interface UserInfoStatsMobileProps {
//   totalPost: number;
//   totalFollowers: number;
//   totalFollowing: number;
// }

interface UserInfoStatsMobileProps {
  totalPost: number;
}

const useStyles = makeStyles(() => ({
  mobileStats: {
    height: '3em',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

export function UserInfoStatsMobile(props: UserInfoStatsMobileProps) {
  const classes = useStyles();

  // TODO: enable for remise 2
  // const { totalPost, totalFollowers, totalFollowing } = props;
  //
  // return (
  //   <Box
  //     display="flex"
  //     justifyContent="space-around"
  //     className={classes.mobileStats}
  //   >
  //     <Box id="userInfoStatsPosts">
  //       <div className={classes.textCenter}>
  //         <b>{totalPost}</b>
  //       </div>
  //       <div>post{totalPost > 0 && <span>s</span>}</div>
  //     </Box>
  //     <Box id="userInfoStatsFollowers">
  //       <div className={classes.textCenter}>
  //         <b>{totalFollowers}</b>
  //       </div>
  //       <div>
  //         follower
  //         {totalFollowers > 0 && <span>s</span>}
  //       </div>
  //     </Box>
  //     <Box id="userInfoStatsFollowing">
  //       <div className={classes.textCenter}>
  //         <b>{totalFollowing}</b>
  //       </div>
  //       <div>following</div>
  //     </Box>
  //   </Box>
  // );

  const { totalPost } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      className={classes.mobileStats}
    >
      <Box id="userInfoStatsPosts">
        <div className={classes.textCenter}>
          <b>{totalPost}</b>
        </div>
        <div>post{totalPost > 0 && <span>s</span>}</div>
      </Box>
    </Box>
  );
}
