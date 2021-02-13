import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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
  onUpload: () => action('onUpload'),
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  username: 'Test',
  onUpload: () => action('onUpload'),
  src: 'https://picsum.photos/200',
};
