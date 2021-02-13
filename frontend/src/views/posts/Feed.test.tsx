import React from 'react';
import { render } from '@testing-library/react';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import Feed from './Feed';

describe('When rendering Feed', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<Feed />));
  });
});
