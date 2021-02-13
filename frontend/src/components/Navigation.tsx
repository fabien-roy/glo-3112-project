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
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { MobileBar } from './MobileBar';
import { UserAvatar } from './users/UserAvatar';
import { User } from '../views/users/UserProps';

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
    navButton: {
      color: `white`,
      display: 'flex',
    },
    userButton: {
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
// TODO linker comme il faut les users avec #107
export const Navigation: React.FC = () => {
  const showNotification = false;
  const classes = useStyles();
  const [loggedUser, setLoggedUser] = useState<User>({
    username: 'TestUser',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    description: '',
    avatarReference: '',
  });

  useEffect(() => {
    const user = {
      username: 'TestUser',
      email: '',
      phoneNumber: '',
      firstName: 'Test',
      lastName: 'User',
      description: '',
      avatarReference:
        'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
    };

    const getUser = () => {
      setLoggedUser(user);
    };
    getUser();
  }, []);

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
            <Link to="/" className={classes.navButton}>
              <IconButton id="home-button" color="inherit" aria-label="Go home">
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to="/" className={classes.navButton}>
              <IconButton
                id="add-post-button"
                color="inherit"
                aria-label="Add post"
              >
                <AddIcon />
              </IconButton>
            </Link>
            {showNotification && (
              <Link to="/" className={classes.navButton}>
                <IconButton
                  id="notifs-button"
                  aria-label="17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Link>
            )}
            <Link
              to={`/users/${loggedUser.username}`}
              className={classes.navButton}
            >
              <IconButton
                className={classes.userButton}
                id="user-button"
                color="inherit"
                aria-label="Go to user profile"
              >
                <UserAvatar
                  src={loggedUser.avatarReference}
                  size="small"
                  username={loggedUser.username}
                />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.sectionMobile}>
        <MobileBar loggedUser={loggedUser} />
      </div>
    </div>
  );
};
