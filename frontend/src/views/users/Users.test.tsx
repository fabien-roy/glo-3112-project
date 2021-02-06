import React from 'react';
import { render } from '@testing-library/react';
import useMemoryRouter from '../../hooks/useMemoryRouter';
import Users from './Users';

it('renders Users', () => {
  render(useMemoryRouter(<Users />));
});
