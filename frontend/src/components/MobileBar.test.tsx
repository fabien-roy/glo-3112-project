import React from 'react';
import { render } from '@testing-library/react';
import { MobileBar } from './MobileBar';

describe('When rendering MobileBar', () => {
  it('Should render', () => {
    render(<MobileBar />);
  });
});
