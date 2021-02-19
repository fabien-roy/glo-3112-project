import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostCard, { PostCardProps } from './PostCard';

const post = PostFactory.make();

export default {
  title: 'components/posts/PostCard',
  component: PostCard,
};

const Template: Story<PostCardProps> = ({ ...args }) =>
  wrapInMemoryRouter(<PostCard {...args} />);

export const Basic = Template.bind({});
Basic.args = {
  id: post.id,
  reference: post.reference,
  description: post.description,
  hashtags: post.hashtags,
  usertags: post.usertags,
  user: post.user,
};
