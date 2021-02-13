import React from 'react';
import wrapInMemoryRouter from '../../util/wrapInMemoryRouter';
import { Feed } from './Feed';

export default {
  title: 'views/posts/Feed',
  component: Feed,
};

export const Basic = () => wrapInMemoryRouter(<Feed />);
