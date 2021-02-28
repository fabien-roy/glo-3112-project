import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import TagsSection, { TagsSectionProps } from './TagsSection';

const post = PostFactory.make();

export default {
  title: 'components/posts/TagsSection',
  component: TagsSection,
};

const Template: Story<TagsSectionProps> = ({ ...args }) =>
  wrapInMemoryRouter(<TagsSection {...args} />);

export const WithTags = Template.bind({});
WithTags.args = {
  usertags: post.usertags,
};

export const WithoutTag = Template.bind({});
WithoutTag.args = {
  tags: [],
};
