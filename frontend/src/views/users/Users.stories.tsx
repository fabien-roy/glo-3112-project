import React from 'react';
import { Users } from './Users';
import useMemoryRouter from '../../hooks/useMemoryRouter';

export default {
  title: 'views/users/Users',
  component: Users,
};

export const Basic = () => useMemoryRouter(<Users />);
