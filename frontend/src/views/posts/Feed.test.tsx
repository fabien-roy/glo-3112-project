import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Feed from './Feed';

it('renders Feed', () => {
  render(
    <MemoryRouter>
      <Feed />
    </MemoryRouter>
  );
});
