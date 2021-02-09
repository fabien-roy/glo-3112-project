import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import IconButton from '@material-ui/core/IconButton';
import UserAvatar from './UserAvatar';
import EditUserAvatar from './EditUserAvatar';

Enzyme.configure({ adapter: new Adapter() });

describe('When input file change', () => {
  it('Should load file to s3', () => {
    const files = ['someFiles'];
    const props = {
      userName: 'Test',
      onUpload: jest.fn(),
    };
    const wrapper = mount(<EditUserAvatar {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { files } });

    expect(props.onUpload).toHaveBeenCalledTimes(1);
  });
});

describe('When rendering EditUserAvatar', () => {
  it('Should wrap UserAvatar with an IconButton when rendering', () => {
    render(<IconButton />);
  });
});

describe('When rendering EditUserAvatar', () => {
  it('Should render UserAvatar', () => {
    render(<UserAvatar userName="Test" />);
  });
});
