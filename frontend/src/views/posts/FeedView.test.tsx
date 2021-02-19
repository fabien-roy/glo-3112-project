import React from 'react';
import { render } from '@testing-library/react';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import FeedView from './FeedView';

describe('When rendering FeedView', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<FeedView />));
  });
});
