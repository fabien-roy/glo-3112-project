import React from 'react';
import { render } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('When rendering SearchBar', () => {
  it('Should render', () => {
    render(<SearchBar />);
  });
});
