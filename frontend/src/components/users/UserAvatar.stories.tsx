import React from 'react';
import { Story } from '@storybook/react';
import { UserAvatar, UserAvatarProps } from './UserAvatar';

export default {
  title: 'components/users/UserAvatar',
  component: UserAvatar,
};

const Template: Story<UserAvatarProps> = ({ ...args }) => (
  <UserAvatar {...args} />
);

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  username: 'Test',
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  username: 'Test',
  src: 'https://picsum.photos/200',
};
