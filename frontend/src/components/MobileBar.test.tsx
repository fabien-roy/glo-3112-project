import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import useMemoryRouter from '../hooks/useMemoryRouter';
import { MobileBar } from './MobileBar';
import UserAvatar from './users/UserAvatar';

const user = {
  name: 'TestUser',
  avatar: 'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
};

describe('When rendering MobileBar', () => {
  it('Should render', () => {
    render(useMemoryRouter(<MobileBar loggedUser={user} />));
  });
});

describe('MobileBar', () => {
  let layout: any;
  beforeEach(() => {
    layout = shallow(<MobileBar loggedUser={user} />);
  });

  test('Renders all components', () => {
    expect(layout.find(IconButton)).toHaveLength(3);
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });

  test('Contain 3 router links', () => {
    expect(layout.find(Link)).toHaveLength(3);
  });
});
