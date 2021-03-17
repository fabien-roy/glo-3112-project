import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import { UserContext } from 'context/userContext';
import MainLayout from './layouts/MainLayout';
import { readUserFromCookie } from './util/cookie';

const App = () => {
  const [user, setUser] = useState(readUserFromCookie());

  return (
    <UserContext.Provider
      value={{ currentUser: user, setUser: (usr) => setUser(usr) }}
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
