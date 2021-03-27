import React from 'react';
import { Story } from '@storybook/react';
import Cam, { CamProps } from './index';

export default {
  title: 'components/Cam/Cam',
  component: Cam,
};

const Template: Story<CamProps> = ({ ...args }) => <Cam {...args} />;

export const DefaultCam = Template.bind({});
DefaultCam.args = {
  isFullscreen: false,
  onPictureSnap: (data) => {
    console.log(data);
  },
};
