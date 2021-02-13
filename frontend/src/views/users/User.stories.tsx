import React from 'react';
import { User } from './User';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/users/User',
  component: User,
};

// TODO : Find a way to simulate username, or rethink usage of util
export const Basic = () => wrapInMemoryRouter(<User />);
