import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Router } from 'router/Router';
import { routes, authRoutes } from 'router/Config';
import useGetLoggedUser from 'hooks/users/useGetLoggedUser';
import MainLayout from './layouts/MainLayout';
import AuthentificationLayout from './layouts/AuthentificationLayout';

function App() {
  const { loggedUser } = useGetLoggedUser();
  return loggedUser ? (
    <BrowserRouter>
      <MainLayout>
        <Router routes={routes} />
      </MainLayout>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <AuthentificationLayout>
        <Router routes={authRoutes} />
      </AuthentificationLayout>
    </BrowserRouter>
  );
}

export default App;
