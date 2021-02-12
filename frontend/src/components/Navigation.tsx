import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { MobileBar } from './MobileBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'flex',
      fontFamily: ['Rock Salt', 'cursive'].join(','),
      width: '90px',
      fontSize: '1.1rem',
    },
    avatar: {
      marginTop: '4px',
      marginLeft: '20px',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

export const Navigation: React.FC = () => {
  const classes = useStyles();
  const [loggedUser, setLoggedUser] = useState<string>('');

  useEffect(() => {
    const getUser = () => {
      // hardcoded for now; to be obtained from token in L2
      const user = 'TestUser';
      setLoggedUser(user);
    };
    getUser();
  }, []);

  const history = useHistory();
  const routeChange = (route: string) => {
    history.push(route);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Ugram
          </Typography>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              id="home-button"
              color="inherit"
              aria-label="Go home"
              onClick={() => routeChange('/')}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              id="add-post-button"
              color="inherit"
              aria-label="Add post"
            >
              <AddIcon />
            </IconButton>
            <IconButton
              id="notifs-button"
              aria-label="17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              id="user-button"
              color="inherit"
              aria-label="Go to user profile"
              onClick={() => routeChange(`/users/${loggedUser}`)}
            >
              <Avatar
                className={classes.avatar}
                aria-label="User avatar"
                color="inherit"
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.sectionMobile}>
        <MobileBar loggedUser={loggedUser} routeChange={routeChange} />
      </div>
    </div>
  );
};
