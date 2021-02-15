import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import MainLayout from './layouts/MainLayout';
import { UserHeader } from './components/users/userHeader/UserHeader';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Router routes={routes} />
        <UserHeader
          username="Bakakage_"
          stats={{
            totalPost: 45,
            totalFollowers: 523,
            totalFollowing: 956,
          }}
          fullname="Omar Akrout"
          description="This is a description"
        />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
