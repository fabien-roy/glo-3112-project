import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Feed } from './Feed';

export default {
  title: 'views/posts/Feed',
  component: Feed,
};

export const Basic = () => (
  <MemoryRouter>
    <Feed />
  </MemoryRouter>
);
