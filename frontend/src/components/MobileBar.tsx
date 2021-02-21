import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { User } from 'types/users';
import { UserAvatar } from './users/avatar/UserAvatar';

const useStyles = makeStyles(
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: '15px',
      height: '30px',
      width: '30px',
    },
    toolbar: {
      minHeight: '15px',
    },
    navButton: {
      color: `white`,
      display: 'flex',
    },
  })
);

export interface MobileBarProps {
  loggedUser?: User | null;
}

export const MobileBar: React.FC<MobileBarProps> = ({ loggedUser }) => {
  const classes = useStyles();

  const loggedUserAvatar = loggedUser ? (
    <Link to={`/users/${loggedUser.username}`} className={classes.navButton}>
      <IconButton color="inherit" aria-label="Go to user profile">
        <UserAvatar
          src={loggedUser.avatarReference}
          size="small"
          username={loggedUser.username}
        />
      </IconButton>
    </Link>
  ) : null;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.navButton}>
            <IconButton color="inherit" aria-label="Go home">
              <HomeIcon id="home-button" />
            </IconButton>
          </Link>
          <Link to="/" className={classes.navButton}>
            <IconButton color="inherit" aria-label="Add post">
              <AddIcon />
            </IconButton>
          </Link>
          <div className={classes.grow} />
          {loggedUserAvatar}
        </Toolbar>
      </AppBar>
    </>
  );
};

MobileBar.defaultProps = {
  loggedUser: null,
};
