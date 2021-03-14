import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import useGetLoggedUser from 'hooks/users/useGetLoggedUser';
import { UserContext } from 'context/userContext';
import MainLayout from './layouts/MainLayout';

const App = () => {
  const { loggedUser, isLoading: userLoading } = useGetLoggedUser();

  return (
    <UserContext.Provider
      value={{ currentUser: loggedUser, loading: userLoading }}
    >
      <BrowserRouter>
        <MainLayout>
          <Router routes={routes} />
        </MainLayout>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
