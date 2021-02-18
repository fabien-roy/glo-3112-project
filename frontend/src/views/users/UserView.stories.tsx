import React from 'react';
import { UserView } from './UserView';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/users/UserView',
  component: UserView,
};

// TODO : Find a way to simulate username, or rethink usage of util
export const Basic = () => wrapInMemoryRouter(<UserView />);
