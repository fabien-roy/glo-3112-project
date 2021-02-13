import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import { MobileBar } from './MobileBar';
import { UserAvatar } from './users/UserAvatar';

// TODO linker comme il faut les users avec #107
const user = {
  username: 'TestUser',
  avatar: 'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  description: '',
  avatarReference: undefined,
};

describe('When rendering MobileBar', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<MobileBar loggedUser={user} />));
  });

  const layout = shallow(<MobileBar loggedUser={user} />);
  test('Renders all components', () => {
    expect(layout.find(IconButton)).toHaveLength(3);
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });

  test('Contain 3 router links', () => {
    expect(layout.find(Link)).toHaveLength(3);
  });
});
