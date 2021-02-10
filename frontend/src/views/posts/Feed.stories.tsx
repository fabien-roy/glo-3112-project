import React from 'react';
import useMemoryRouter from '../../hooks/useMemoryRouter';
import { Feed } from './Feed';

export default {
  title: 'views/posts/Feed',
  component: Feed,
};

export const Basic = () => useMemoryRouter(<Feed />);
