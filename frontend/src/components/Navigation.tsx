import React from 'react';
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
import { User } from 'types/users';
import { SearchBar } from './SearchBar';
import { MobileBar } from './MobileBar';
import { UserAvatar } from './users/UserAvatar';

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

export interface NavigationProps {
  users: User[];
  loggedUser: User;
  isLoading: boolean;
}

export const Navigation: React.FC<NavigationProps> = (
  props: NavigationProps
) => {
  const showNotification = false;
  const classes = useStyles();
  const { users, loggedUser, isLoading } = props;

  // TODO : Add link on "Ugram"
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Ugram
          </Typography>
          <SearchBar users={users} isLoading={isLoading} />
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
