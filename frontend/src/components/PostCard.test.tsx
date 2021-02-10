import React from 'react';
import { render } from '@testing-library/react';
import { PostCard } from './PostCard';

describe('When rendering PostCard', () => {
  it('Should render', () => {
    render(<PostCard />);
  });
});
