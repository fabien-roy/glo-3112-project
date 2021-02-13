import React from 'react';
import { Navigation } from './Navigation';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';

export default {
  title: 'components/Navigation',
  component: Navigation,
};

export const Basic = () => wrapInMemoryRouter(<Navigation />);
