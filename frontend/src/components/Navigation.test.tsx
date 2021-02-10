import React from 'react';
import { render } from '@testing-library/react';
import { Navigation } from './Navigation';

describe('When rendering Navigation', () => {
  it('Should render', () => {
    render(<Navigation />);
  });
});
