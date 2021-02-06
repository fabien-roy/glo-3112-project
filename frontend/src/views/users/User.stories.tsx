import React from 'react';
import { User } from './User';
import useMemoryRouter from '../../hooks/useMemoryRouter';

export default {
  title: 'views/users/User',
  component: User,
};

// TODO : Find a way to simulate username, or rethink usage of hooks
export const Basic = () => useMemoryRouter(<User />);
