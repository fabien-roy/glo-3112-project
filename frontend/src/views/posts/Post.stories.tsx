import React from 'react';
import { Post } from './Post';
import useMemoryRouter from '../../hooks/useMemoryRouter';

export default {
  title: 'views/posts/Post',
  component: Post,
};

// TODO : Find a way to simulate post ID, or rethink usage of hooks
export const Basic = () => useMemoryRouter(<Post />);
