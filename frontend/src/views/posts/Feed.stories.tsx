import React from 'react';
import { Feed } from './Feed';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/posts/Feed',
  component: Feed,
};

export const Basic = () => wrapInMemoryRouter(<Feed />);
