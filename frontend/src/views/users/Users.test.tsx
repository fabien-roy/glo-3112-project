import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Users from './Users';

it('renders Users', () => {
  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>
  );
});
