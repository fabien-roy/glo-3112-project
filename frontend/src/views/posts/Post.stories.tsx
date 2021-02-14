import React from 'react';
import { Post } from './Post';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/posts/Post',
  component: Post,
};

// TODO : Find a way to simulate post ID, or rethink usage of util
export const Basic = () => wrapInMemoryRouter(<Post />);
