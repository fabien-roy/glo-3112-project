import React from 'react';
import { Story } from '@storybook/react';
import Cam, { CamProps } from './index';

export default {
  title: 'components/Cam/Cam',
  component: Cam,
};

const Template: Story<PostCardProps> = ({ ...args }) => <Cam {...args} />;

export const DefaultCam = Template.bind({});
WithoutLoggedUser.args = {
  isFullscreen: false,
  onPictureSnap: (data) => {
    console.log(data);
  },
};
