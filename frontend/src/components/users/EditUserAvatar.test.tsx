import React from 'react';
import { mount, shallow } from 'enzyme';
// import IconButton from '@material-ui/core/IconButton';
import UserAvatar from './UserAvatar';
import EditUserAvatar from './EditUserAvatar';

const props = {
  userName: 'Test',
  onUpload: jest.fn(),
};

describe('When input file change', () => {
  const files = ['someFiles'];

  it('Should call passed upload function', () => {
    const wrapper = mount(<EditUserAvatar {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { files } });

    expect(props.onUpload).toHaveBeenCalledTimes(1);
  });

  it('Should upload the right file', () => {
    const wrapper = mount(<EditUserAvatar {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { files } });

    expect(props.onUpload).toHaveBeenCalledWith(files[0]);
  });
});

describe('When rendering EditUserAvatar', () => {
  it('Should render UserAvatar', () => {
    const wrapper = shallow(<EditUserAvatar {...props} />);

    expect(wrapper.containsMatchingElement(<UserAvatar />)).toEqual(true);
  });
});

describe('When rendering EditUserAvatar', () => {
  it('Should wrap UserAvatar with an IconButton when rendering', () => {
    // const wrapper = mount(<EditUserAvatar {...props} />);
    // TODO: expect IconButton to exist in rendering
    // expect(wrapper.contains(<IconButton/>)).toEqual(true);
  });
});
