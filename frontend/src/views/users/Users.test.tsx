import React from 'react';
import { render } from '@testing-library/react';
import useMemoryRouter from '../../hooks/useMemoryRouter';
import Users from './Users';

describe('When rendering Users', () => {
  it('Should render', () => {
    render(useMemoryRouter(<Users />));
  });
});
