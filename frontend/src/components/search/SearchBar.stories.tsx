import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { PostFactory } from 'factories/PostFactory';
import { SearchBar, SearchBarProps } from './SearchBar';

export default {
  title: 'components/SearchBar',
  component: SearchBar,
  argTypes: { handleInputChange: { action: 'inputChanged' } },
};

const Template: Story<SearchBarProps> = ({ ...args }) => (
  <SearchBar {...args} />
);

export const WithoutData = Template.bind({});
WithoutData.args = {
  users: [],
  posts: [],
  isLoading: false,
};

export const WithData = Template.bind({});
WithData.args = {
  users: UserFactory.make(3),
  posts: PostFactory.make(3),
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  users: [],
  posts: [],
  isLoading: true,
};
