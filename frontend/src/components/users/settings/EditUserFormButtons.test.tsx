import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Button from '@material-ui/core/Button';
import { EditUserFormButtons } from './EditUserFormButtons';

const props = {
  disableSend: true,
  delete: jest.fn(() => {}),
};

const sendButton = (
  <Button
    disabled={props.disableSend}
    variant="contained"
    color="primary"
    type="submit"
  >
    Send
  </Button>
);

const deleteAccountButton = (
  <Button variant="outlined" color="primary" onClick={props.delete}>
    Delete your account
  </Button>
);

describe('When rendering EditUserFormButtons', () => {
  it('Should render delete account Button with passed delete prop', () => {
    const wrapper = mount(<EditUserFormButtons {...props} />);

    expect(wrapper.containsMatchingElement(deleteAccountButton)).toBeTruthy();
  });

  it('Should render send Button with passed disabled prop', () => {
    const wrapper = mount(<EditUserFormButtons {...props} />);

    expect(wrapper.containsMatchingElement(sendButton)).toBeTruthy();
  });

  it('Should render', () => {
    render(<EditUserFormButtons {...props} />);
  });
});
