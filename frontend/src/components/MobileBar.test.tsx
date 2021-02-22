import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { UserFactory } from 'factories/UserFactory';
import { MobileBar } from './MobileBar';
import { UserAvatar } from './users/avatar/UserAvatar';

const user = UserFactory.make();

describe('When rendering MobileBar', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<MobileBar loggedUser={user} />));
  });

  const layout = shallow(<MobileBar loggedUser={user} />);
  test('Renders all components', () => {
    expect(layout.find(IconButton)).toHaveLength(3);
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });

  test('Contain 4 router links', () => {
    expect(layout.find(Link)).toHaveLength(4);
  });
});
