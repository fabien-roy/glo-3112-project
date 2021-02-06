import React from 'react';
import { render } from '@testing-library/react';
import useMemoryRouter from '../../hooks/useMemoryRouter';
import Feed from './Feed';

it('renders Feed', () => {
  render(useMemoryRouter(<Feed />));
});
