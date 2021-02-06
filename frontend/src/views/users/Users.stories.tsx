import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Users } from './Users';

export default {
  title: 'views/users/Users',
  component: Users,
};

export const Basic = () => (
  <MemoryRouter>
    <Users />
  </MemoryRouter>
);
