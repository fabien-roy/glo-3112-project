import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter forceRefresh>
      <MainLayout>
        <Router routes={routes} />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
