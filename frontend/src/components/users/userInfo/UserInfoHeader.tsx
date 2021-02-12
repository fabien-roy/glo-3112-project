import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

export const useStyles = makeStyles(
  createStyles({
    headerFontSize: {
      fontSize: '200%',
    },
  })
);

interface UserInfoHeaderProps {
  username: string;
}

export default function UserInfoHeader(props: UserInfoHeaderProps) {
  const classes = useStyles();
  const { username } = props;

  return (
    <Box mb={2} className={classes.headerFontSize}>
      <span>{username}</span>
    </Box>
  );
}
