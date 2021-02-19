import React from 'react';
import { User } from 'types/users';
import { Navigation } from './Navigation';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';

export default {
  title: 'components/Navigation',
  component: Navigation,
};

const user = {
  username: 'TestUser',
  email: 'TestUser@gmail.com',
  phoneNumber: '514-222-3333',
  firstName: 'Test',
  lastName: 'User',
  description: '',
  avatarReference:
    'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
};

const users: User[] = [];

export const Basic = () =>
  wrapInMemoryRouter(
    <Navigation users={users} loggedUser={user} isLoading={false} />
  );
