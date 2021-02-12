import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mount, shallow } from 'enzyme';
import UserAvatar from './UserAvatar';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(1),
    height: theme.spacing(1),
  },
}));

const UserAvatarWrapper = () => {
  const classes = useStyles();
  return <UserAvatar userName="Test" size={classes.small} />;
};

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
  it('Should render Avatar with the given size', () => {
    const wrapper = mount(<UserAvatarWrapper />);

    expect(wrapper.find('.MuiAvatar-root').hasClass('makeStyles-small-2')).toBe(
      true
    );
  });

  it('Should render Avatar with the default size if no size given', () => {
    const wrapper = mount(<UserAvatar userName="Test" />);

    expect(
      wrapper.find('.MuiAvatar-root').hasClass('makeStyles-defaultSize-1')
    ).toBe(true);
  });

  it('Should render Avatar', () => {
    render(<Avatar />);
  });
});
