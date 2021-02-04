import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import User from './User';

const username = 'username';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ username }),
}));

it('renders User', () => {
  render(
    <MemoryRouter>
      <User />
    </MemoryRouter>
  );
});
