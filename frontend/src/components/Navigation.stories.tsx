import React from 'react';
import { Navigation } from './Navigation';
import useMemoryRouter from '../hooks/useMemoryRouter';

export default {
  title: 'components/Navigation',
  component: Navigation,
};

export const Basic = () => useMemoryRouter(<Navigation />);
