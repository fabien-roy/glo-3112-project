import React from 'react';
import { mount, shallow } from 'enzyme';
import { UserAvatar } from './UserAvatar';
import { EditUserAvatar } from './EditUserAvatar';
import useUploadToS3 from 'hooks/images/useUploadToS3';

const props = {
  username: 'Test'
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

jest.mock('hooks/images/useUploadToS3');

const useUploadHookResponse = ['reference', null];

describe('When rendering EditUserAvatar', () => {
  beforeEach(() => {
    useUploadToS3.mockReturnValue(useUploadHookResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call useUploadToS3 Hook with the right file', () => {
    const wrapper = mount(<EditUserAvatar {...props} />);
    const files = ['someFiles'];
    const input = wrapper.find('input');

    input.simulate('change', { target: { files } });

    expect(useUploadToS3).toHaveBeenCalledWith(files[0], 'avatars');
  });

  it('Should render UserAvatar', () => {
    const wrapper = mount(<EditUserAvatar {...props} />);

    expect(wrapper.containsMatchingElement(<UserAvatar {...props} />)).toEqual(
      true
    );
  });

  it('Should wrap UserAvatar with an IconButton when rendering', () => {
    const wrapper = mount(<EditUserAvatar {...props} />);

    expect(wrapper.find('.MuiButtonBase-root')).toHaveLength(1);
  });
});
