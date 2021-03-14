import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import useGetLoggedUser from 'hooks/users/useGetLoggedUser';
import MainLayout from './layouts/MainLayout';

function App() {
  const { loggedUser } = useGetLoggedUser();

  return (
    <BrowserRouter>
      <MainLayout>
        <Router
          routes={routes}
          logged={loggedUser !== undefined && loggedUser !== null}
        />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
