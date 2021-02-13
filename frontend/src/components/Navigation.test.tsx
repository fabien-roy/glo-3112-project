import React from 'react';
import { render } from '@testing-library/react';
import expect from 'expect';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import useMemoryRouter from '../hooks/useMemoryRouter';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import UserAvatar from './users/UserAvatar';

describe('When rendering Navigation', () => {
  it('Should render', () => {
    render(useMemoryRouter(<Navigation />));
  });

  let layout: any;
  beforeEach(() => {
    layout = shallow(<Navigation />);
  });

  it('Should contain Ugram brand', () => {
    expect(layout.contains('Ugram')).toEqual(true);
  });

  it('Should render all components', () => {
    expect(layout.find(SearchBar)).toHaveLength(1);
    expect(layout.find(IconButton)).toHaveLength(3);
    expect(layout.find(UserAvatar)).toHaveLength(1);
  });

  it('Should contain 3 router links', () => {
    expect(layout.find(Link)).toHaveLength(3);
  });
});
