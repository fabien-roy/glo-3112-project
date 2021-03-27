import React from 'react';
import { shallow, render } from 'enzyme';
import Camera from 'react-html5-camera-photo';
import Cam from './index';

const camProps = {
  isFullScreen: false,
  onPictureSnap: jest.fn(),
};

describe('When rendering Camera', () => {
  it('without picture captured should render video Camera', () => {
    const wrapper = shallow(<Cam {...camProps} />);
    expect(wrapper.containsMatchingElement(<Camera />)).toBeTruthy();
  });

  it('Should render', () => {
    render(<Cam {...camProps} />);
  });
});
