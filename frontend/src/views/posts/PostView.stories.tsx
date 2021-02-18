import React from 'react';
import { PostView } from './PostView';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

export default {
  title: 'views/posts/PostView',
  component: PostView,
};

// TODO : Find a way to simulate post ID, or rethink usage of util
export const Basic = () => wrapInMemoryRouter(<PostView />);
