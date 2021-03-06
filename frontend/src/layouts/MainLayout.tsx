import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Box, Container } from '@material-ui/core';
import useGetPosts from 'hooks/posts/useGetPosts';
import { Navigation } from '../components/Navigation';
import useGetUsers from '../hooks/users/useGetUsers';
import SnackbarMessage from '../components/SnackbarMessage';

export interface MainLayoutParams {
  children: any;
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: ['Noto+Sans', 'sans-serif'].join(','),
  },
});

export const MainLayout = ({ children }: MainLayoutParams) => {
  const {
    users,
    loggedUser,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useGetUsers();

  const { posts, isLoading: isLoadingPosts, error: postsError } = useGetPosts();
  // const [searchCategory, setSearchCategory] = useState('All');

  const errorMessageUsers = usersError ? (
    <SnackbarMessage severity="error" description="Could not fetch users" />
  ) : null;

  const errorMessagePosts = postsError ? (
    <SnackbarMessage severity="error" description="Could not fetch posts" />
  ) : null;

  return (
    <ThemeProvider theme={theme}>
      <Navigation
        users={users}
        posts={posts}
        loggedUser={loggedUser}
        isLoading={isLoadingUsers || isLoadingPosts}
        searchCategory="All"
      />
      <Container>
        {children}
        {errorMessageUsers}
        {errorMessagePosts}
        <Box height="calc(64px + 2vh)" />
      </Container>
    </ThemeProvider>
  );
};
export default MainLayout;
