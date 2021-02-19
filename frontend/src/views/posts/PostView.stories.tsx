import React from 'react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostView } from './PostView';

export default {
  title: 'views/posts/PostView',
  component: PostView,
};

// TODO : Find a way to simulate post ID, or rethink usage of util
export const Basic = () => wrapInMemoryRouter(<PostView />);
