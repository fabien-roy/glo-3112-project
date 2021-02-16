import React from 'react';
import { mount, shallow } from 'enzyme';
import { UserAvatar } from './UserAvatar';
import { EditUserAvatar } from './EditUserAvatar';

const props = {
  username: 'Test',
  onUpload: jest.fn(),
};

// TODO: validate when file changes useUploadToS3 hook is called
// describe('When input file change', () => {
//   const files = ['someFiles'];
//   it('Should call passed upload function', () => {
//     const wrapper = mount(<EditUserAvatar {...props} />);
//     const input = wrapper.find('input');
//
//     input.simulate('change', { target: { files } });
//
//     expect(props.onUpload).toHaveBeenCalledTimes(1);
//   });
//
//   it('Should upload the right file', () => {
//     const wrapper = mount(<EditUserAvatar {...props} />);
//     const input = wrapper.find('input');
//
//     input.simulate('change', { target: { files } });
//
//
//     expect(props.onUpload).toHaveBeenCalledWith(files[0]);
//   });
// });

describe('When rendering EditUserAvatar', () => {
  it('Should render UserAvatar', () => {
    const wrapper = shallow(<EditUserAvatar {...props} />);

    expect(wrapper.containsMatchingElement(<UserAvatar {...props} />)).toEqual(
      true
    );
  });

  it('Should wrap UserAvatar with an IconButton when rendering', () => {
    const wrapper = mount(<EditUserAvatar {...props} />);

    expect(wrapper.find('.MuiButtonBase-root')).toHaveLength(1);
  });
});
