import React from 'react';
import { mount, shallow, render } from 'enzyme';
import CloseIcon from '@material-ui/icons/Close';
import { ImagePreview } from './ImagePreview';

const imagePreviewProps = {
  dataUri: "dataUri",
  width: 400,
  isFullscreen: false,
  onReset: jest.fn(),
}

describe('When rendering Camera ImagePreview', () => {
  it('Should contain close icon', () => {
    const wrapper = shallow(<ImagePreview {...imagePreviewProps} />);
    expect(wrapper.containsMatchingElement(<CloseIcon color="primary" onClick={imagePreviewProps.onReset}/>)).toBeTruthy();
  });

  it('Should contain current snap picture', () => {
    const wrapper = mount(<ImagePreview {...imagePreviewProps} />);
    expect(wrapper.find('img')).toBeTruthy();
    expect(wrapper.find('img').prop('src')).toBe(imagePreviewProps.dataUri);
  });

  it('Should render', () => {
    render(<ImagePreview dataUri="dataUri" width={400} isFullScreen={false} onReset={jest.fn()} />);
  });
});
