import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, render } from 'enzyme';
import Camera from 'react-html5-camera-photo';
import { ImagePreview } from './ImagePreview'
import Cam from './index';

const camProps = {
  isFullScreen: false,
  onPictureSnap: jest.fn(),
}

const imagePreviewProps = {
  dataUri: "dataUri",
  width: 370,
  isFullscreen: false,
  onReset: jest.fn(),
}

describe('When rendering Camera', () => {
  //TODO: find a way to test preview on click
  // it('and capturing a picture should ImagePreview', () => {
  //
  // });


  it('without picture captured should render video Camera', () => {
    const wrapper = shallow(<Cam {...camProps} />);
    expect(wrapper.containsMatchingElement(<Camera />)).toBeTruthy();
  });

  it('Should render', () => {
    render(<Cam {...camProps} />);
  });
});
