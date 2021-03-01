import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { User } from 'types/users';
import { Post } from 'types/posts';
import { SearchBar } from './SearchBar';
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
  })
);

export interface NavigationProps {
  users: User[];
  posts: Post[];
  loggedUser?: User | null;
  isLoading: boolean;
}

export const Navigation: React.FC<NavigationProps> = (
  props: NavigationProps
) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { users, posts, loggedUser, isLoading } = props;

  const loggedUserButtons = loggedUser ? (
    <>
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
          <Link to="/" className={classes.titleLink}>
            <Typography className={classes.title} variant="h6" noWrap>
              <div className={classes.sectionDesktop}>Ugram</div>
              <div className={classes.sectionMobile}>UG</div>
            </Typography>
          </Link>
          <SearchBar users={users} posts={posts} isLoading={isLoading} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/" className={classes.navButton}>
              <IconButton id="home-button" color="inherit" aria-label="Go home">
                <HomeIcon />
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
