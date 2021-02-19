import React from 'react';
import { Story } from '@storybook/react';
import { EditUserAvatar, EditUserAvatarProps } from './EditUserAvatar';

export default {
  title: 'components/users/EditUserAvatar',
  component: EditUserAvatar,
};

const Template: Story<EditUserAvatarProps> = ({ ...args }) => (
  <EditUserAvatar {...args} />
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
