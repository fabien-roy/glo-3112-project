import React from 'react';
import { render } from '@testing-library/react';
import useMemoryRouter from '../../hooks/useMemoryRouter';
import Feed from './Feed';

describe('When rendering Feed', () => {
  it('Should render', () => {
    render(useMemoryRouter(<Feed />));
  });
});
