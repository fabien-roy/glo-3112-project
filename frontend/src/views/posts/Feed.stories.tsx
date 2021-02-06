import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Feed } from './Feed';

export default {
  title: 'Feed',
  component: Feed,
};

export const Basic = () => (
  <MemoryRouter>
    <Feed />
  </MemoryRouter>
);
