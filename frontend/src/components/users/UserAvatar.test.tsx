import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from '@material-ui/core';
import UserAvatar from './UserAvatar';

test('Avatar contains image when src prop is passed', () => {
  const userAvatar = renderer.create(
    <UserAvatar
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
      userName="Omar"
    />
  );

  const tree = userAvatar.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Avatar contains username first letter when src prop is absent', () => {
  const userAvatar = renderer.create(<UserAvatar userName="Test" />);

  const tree = userAvatar.toJSON();

  expect(tree).toMatchSnapshot();
});

describe('When rendering UserAvatar', () => {
  it('Should render Avatar', () => {
    render(<Avatar />);
  });
});
