import React from 'react';
import { Story } from '@storybook/react';
import { UserHeader, UserHeaderProps } from './UserHeader';

export default {
  title: 'components/users/header/UserHeader',
  component: UserHeader,
};

const Template: Story<UserHeaderProps> = ({ ...args }) => (
  <UserHeader {...args} />
);

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  username: 'Test',
  stats: {
    totalPost: 52,
  },
  fullname: 'Full Name',
  description: 'This is a description',
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  username: 'Test',
  avatarSrc:
    'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  stats: {
    totalPost: 52,
  },
  fullname: 'Full Name',
  description: 'This is a description',
};
