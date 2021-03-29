import React from 'react';
import { shallow } from 'enzyme';
import { PostFactory } from 'factories/PostFactory';
import { UserFactory } from 'factories/UserFactory';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import { SearchImages } from './SearchImages';
import { SearchList } from './SearchList';

const users = UserFactory.make(5);
const posts = PostFactory.make(3);

const hashtags = [
  { name: 'peace', count: 150 },
  { name: 'love', count: 300 },
];

const searchListProps1 = {
  tab: 0,
  users,
  hashtags,
  descriptionPosts: posts,
};

const searchListProps2 = {
  tab: 1,
  users,
  hashtags,
  descriptionPosts: posts,
};

const searchListProps3 = {
  tab: 2,
  users,
  hashtags,
  descriptionPosts: posts,
};

describe('When rendering SearchList of users', () => {
  const layout = shallow(<SearchList {...searchListProps1} />);

  it('Should render 1 table with 5 users', () => {
    expect(layout.find(Table)).toHaveLength(1);
    expect(layout.find(TableRow)).toHaveLength(5);
  });
});

describe('When rendering SearchList of hashtags', () => {
  const layout = shallow(<SearchList {...searchListProps2} />);

  it('Should render 1 table with 2 hashtags', () => {
    expect(layout.find(Table)).toHaveLength(1);
    expect(layout.find(TableRow)).toHaveLength(2);
  });
});

describe('When rendering SearchList of posts', () => {
  const layout = shallow(<SearchList {...searchListProps3} />);

  it('Should render 1 SearchImage component', () => {
    expect(layout.find(SearchImages)).toHaveLength(1);
  });
});
