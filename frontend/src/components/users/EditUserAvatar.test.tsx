import React from 'react';
import { mount } from 'enzyme';
import useUploadToS3 from 'hooks/images/useUploadToS3';
import { UserAvatar } from './UserAvatar';
import { EditUserAvatar } from './EditUserAvatar';

const props = {
  username: 'Test',
};

jest.mock('hooks/images/useUploadToS3');

const useUploadHookResponse = {
  reference: 'reference',
  error: null
};

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
