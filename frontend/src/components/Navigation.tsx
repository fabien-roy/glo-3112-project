import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

import { User } from 'types/users';
import { Post } from 'types/posts';
import { SearchBar } from './search/SearchBar';
import { MobileBar } from './MobileBar';
import { UserAvatar } from './users/avatar/UserAvatar';
import CreatePost from './posts/CreatePost';
import { ModalBox } from './ModalBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    titleLink: {
      textDecoration: 'none',
      color: 'white',
    },
    title: {
      display: 'flex',
      fontFamily: ['Rock Salt', 'cursive'].join(','),
      width: '90px',
      fontSize: '1.1rem',
    },
    titleMobile: {
      display: 'flex',
      fontFamily: ['Rock Salt', 'cursive'].join(','),
      width: '30px',
      fontSize: '1.1rem',
      marginRight: '20px',
    },
    navButton: {
      color: 'white',
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
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 20,
    },
  })
);

export interface NavigationProps {
  loggedUser?: User | null;
}

export const Navigation: React.FC<NavigationProps> = (
  props: NavigationProps
) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loggedUser } = props;

  // TODO: Fix this conditions when the routes are changes
  const inSearchView = useLocation().pathname.endsWith('/search');

  const loggedUserButtons = loggedUser ? (
    <>
      <div className={classes.loginContainer}>
        <a href="http://localhost:4000/auth/google">Sign In</a>
        <a href="http://localhost:4000/auth/logout">Sign Off</a>
      </div>
      <IconButton
        id="add-post-button"
        color="inherit"
        aria-label="Add post"
        onClick={() => setOpenModal(true)}
      >
        <AddIcon />
      </IconButton>
      <Link to="/settings" className={classes.navButton}>
        <IconButton
          id="settings-button"
          color="inherit"
          aria-label="Go to settings"
        >
          <SettingsIcon />
        </IconButton>
      </Link>
      <Link to={`/users/${loggedUser.username}`} className={classes.navButton}>
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
    </>
  ) : null;

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.sectionDesktop}>
            <Link to="/" className={classes.titleLink}>
              <Typography variant="h6" noWrap className={classes.title}>
                UGram
              </Typography>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <Link to="/" className={classes.titleLink}>
              <Typography variant="h6" noWrap className={classes.titleMobile}>
                UG
              </Typography>
            </Link>
          </div>
          <SearchBar inSearchView={inSearchView} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/" className={classes.navButton}>
              <IconButton id="home-button" color="inherit" aria-label="Go home">
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to="/search" className={classes.navButton}>
              <IconButton
                id="search-button"
                color="inherit"
                aria-label="Go to search page"
              >
                <SearchIcon />
              </IconButton>
            </Link>
            {loggedUserButtons}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.sectionMobile}>
        <MobileBar loggedUser={loggedUser} />
      </div>
      <ModalBox
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        title="Create Post"
      >
        <CreatePost
          username={loggedUser?.username}
          successAction={() => setOpenModal(false)}
        />
      </ModalBox>
    </div>
  );
};

Navigation.defaultProps = {
  loggedUser: null,
};
