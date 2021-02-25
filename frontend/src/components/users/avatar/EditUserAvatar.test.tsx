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
  uploadImage: jest.fn(),
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
    const wrapper = mount(
      <EditUserAvatar setAvatarReference={jest.fn()} {...props} />
    );
    const files = ['someFiles'];
    const input = wrapper.find('input');

    input.simulate('change', { target: { files } });

    expect(useUploadHookResponse.uploadImage).toHaveBeenCalledWith(files[0]);
  });

  it('Should render UserAvatar', () => {
    const wrapper = mount(
      <EditUserAvatar setAvatarReference={jest.fn()} {...props} />
    );

    expect(wrapper.containsMatchingElement(<UserAvatar {...props} />)).toEqual(
      true
    );
  });

  it('Should wrap UserAvatar with an IconButton when rendering', () => {
    const wrapper = mount(
      <EditUserAvatar setAvatarReference={jest.fn()} {...props} />
    );

    expect(wrapper.find('.MuiButtonBase-root')).toHaveLength(1);
  });
});
