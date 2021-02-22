import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import { UserFactory } from 'factories/UserFactory';
import PostCard, { PostCardProps } from './PostCard';

const post = PostFactory.make();
const user = UserFactory.make();

export default {
  title: 'components/posts/PostCard',
  component: PostCard,
};

const Template: Story<PostCardProps> = ({ ...args }) =>
  wrapInMemoryRouter(<PostCard {...args} />);

export const WithoutLoggedUser = Template.bind({});
WithoutLoggedUser.args = {
  id: post._id,
  reference: post.reference,
  description: post.description,
  hashtags: post.hashtags,
  usertags: post.usertags,
  user: post.user,
};

export const WithLoggedUser = Template.bind({});
WithLoggedUser.args = {
  id: post._id,
  reference: post.reference,
  description: post.description,
  hashtags: post.hashtags,
  usertags: post.usertags,
  user: user.username,
  loggedUser: user,
};
