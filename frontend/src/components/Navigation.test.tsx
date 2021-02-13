import React from 'react';
import { render } from '@testing-library/react';
import expect from 'expect';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import useMemoryRouter from '../hooks/useMemoryRouter';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import  UserAvatar  from './users/UserAvatar';

describe('When rendering Navigation', () => {
  it('Should render', () => {
    render(useMemoryRouter(<Navigation />));
  });
});

describe('Navigation', () => {
  let layout: any;
  beforeEach(() => {
    layout = shallow(<Navigation />);
  });

  test('Contains Ugram brand', () => {
    expect(layout.contains('Ugram')).toEqual(true);
  });

  test('Renders all components', () => {
    expect(layout.find(SearchBar)).toHaveLength(1);
    expect(layout.find(IconButton)).toHaveLength(3);
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });

  test('Contain 3 router links', () => {
    expect(layout.find(Link)).toHaveLength(3);
  });
});
