import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Post } from './Post';

export default {
  title: 'views/posts/Post',
  component: Post,
};

// TODO : Find a way to simulate post ID, or rethink usage of hooks
export const Basic = () => (
  <MemoryRouter>
    <Post />
  </MemoryRouter>
);
