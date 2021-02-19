import React from 'react';
import { mount } from 'enzyme';
import { UserFactory } from 'factories/UserFactory';
import useUploadToS3 from 'hooks/images/useUploadToS3';
import { UserAvatar } from './UserAvatar';
import { EditUserAvatar } from './EditUserAvatar';

const user = UserFactory.make();

const props = {
  username: user.username,
};

const useUploadHookResponse = {
  reference: user.avatarReference,
  error: null,
};

jest.mock('hooks/images/useUploadToS3');

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
