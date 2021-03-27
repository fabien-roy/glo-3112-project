import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import { UserContext } from 'context/userContext';
import { HelmetProvider } from 'react-helmet-async';
import { HelmetHeader } from 'components/HelmetHeader';
import { ToastProvider } from 'react-toast-notifications';
import MainLayout from './layouts/MainLayout';
import { readUserFromCookie } from './util/cookie';
import { NotificationEvent } from './types/notifications';

const App = () => {
  const [user, setUser] = useState(readUserFromCookie());
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);

  useEffect(() => {
    if (user) {
      const events = new EventSource(
        `${process.env.REACT_APP_BACKEND_URL}/events`,
        { withCredentials: true }
      );
      events.onmessage = (event) => {
        setNotifications((oldNotifications) => [
          ...oldNotifications,
          JSON.parse(event.data),
        ]);
      };
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ currentUser: user, setUser: (usr) => setUser(usr) }}
    >
      <HelmetProvider>
        <HelmetHeader title="UGRAM" />
        <ToastProvider placement="top-center">
          <BrowserRouter>
            <MainLayout notifications={notifications}>
              <Router routes={routes} />
            </MainLayout>
          </BrowserRouter>
        </ToastProvider>
      </HelmetProvider>
    </UserContext.Provider>
  );
};

export default App;
