import React from 'react';
import { Story } from '@storybook/react';
import { EditUserAvatar, EditUserAvatarProps } from './EditUserAvatar';
import { UserFactory } from '../../../factories/UserFactory';

const user = UserFactory.make();

export default {
  title: 'components/users/avatar/EditUserAvatar',
  component: EditUserAvatar,
};

const Template: Story<EditUserAvatarProps> = ({ ...args }) => (
  <EditUserAvatar {...args} />
);

export const WithoutAvatar = Template.bind({});
WithoutAvatar.args = {
  username: user.username,
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  username: user.username,
  src: user.avatarReference,
};
