import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { SearchBar, SearchBarProps } from './SearchBar';

export default {
  title: 'components/SearchBar',
  component: SearchBar,
  argTypes: { handleInputChange: { action: 'inputChanged' } },
};

const Template: Story<SearchBarProps> = ({ ...args }) => (
  <SearchBar {...args} />
);

export const WithoutUser = Template.bind({});
WithoutUser.args = {
  users: [],
  isLoading: false,
};

export const WithUsers = Template.bind({});
WithUsers.args = {
  users: UserFactory.make(3),
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  users: [],
  isLoading: true,
};
