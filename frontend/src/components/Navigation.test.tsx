import React from 'react';
import { render } from '@testing-library/react';
import expect from 'expect';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { createMemoryHistory } from 'history';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';

describe('When rendering Navigation', () => {
  it('Should render', () => {
    render(<Navigation />);
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
    expect(layout.find(IconButton)).toHaveLength(4);
    expect(layout.find(Avatar)).toHaveLength(1);
  });
});

/* describe('Clicking User button', () => {
  const history = createMemoryHistory();
  const wrapper = shallow(<Navigation />);

  wrapper.find('#home-button').simulate('click');
  it('It goes to logged user page', () => {
    expect(history.location.pathname).toEqual('/');
  });
}); */
