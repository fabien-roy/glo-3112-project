import React from 'react';
import { Story } from '@storybook/react';
import { UserFactory } from 'factories/UserFactory';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { Navigation, NavigationProps } from './Navigation';

export default {
  title: 'components/Navigation',
  component: Navigation,
};

const Template: Story<NavigationProps> = ({ ...args }) =>
  wrapInMemoryRouter(<Navigation {...args} />);

export const WithoutUser = Template.bind({});
WithoutUser.args = {
  loggedUser: UserFactory.make(),
  users: [],
  isLoading: false,
};

export const WithUsers = Template.bind({});
WithUsers.args = {
  loggedUser: UserFactory.make(),
  users: UserFactory.make(3),
  isLoading: false,
};

export const WithoutLoggedUser = Template.bind({});
WithoutLoggedUser.args = {
  users: UserFactory.make(3),
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  loggedUser: UserFactory.make(),
  users: [],
  isLoading: true,
};
