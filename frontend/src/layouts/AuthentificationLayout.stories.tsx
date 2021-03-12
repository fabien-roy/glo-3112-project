import React from 'react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { LoginView } from 'views/auth/LoginView';
import AuthentificationLayout from './AuthentificationLayout';

export default {
  title: 'layouts/AuthentificationLayout',
  component: AuthentificationLayout,
};

export const Basic = () =>
  wrapInMemoryRouter(
    <AuthentificationLayout>
      <></>
    </AuthentificationLayout>
  );

export const WithLoginView = () =>
  wrapInMemoryRouter(
    <AuthentificationLayout>
      <LoginView />
    </AuthentificationLayout>
  );
