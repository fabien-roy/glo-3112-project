import React from 'react';
import { render } from '@testing-library/react';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import Users from './Users';

describe('When rendering Users', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<Users />));
  });
});
