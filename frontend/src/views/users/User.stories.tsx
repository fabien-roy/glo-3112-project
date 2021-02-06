import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { User } from './User';

export default {
  title: 'User',
  component: User,
};

// TODO : Find a way to simulate username, or rethink usage of hooks
export const Basic = () => (
  <MemoryRouter>
    <User />
  </MemoryRouter>
);
