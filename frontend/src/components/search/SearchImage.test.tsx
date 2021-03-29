import React from 'react';
import { shallow } from 'enzyme';
import { PostFactory } from 'factories/PostFactory';
import { CardMedia } from '@material-ui/core';
import { SearchImages } from './SearchImages';

const posts = PostFactory.make(4);

const SearchImagesProps = {
  posts,
};

describe('When rendering SearchImage of 4 posts', () => {
  const layout = shallow(<SearchImages {...SearchImagesProps} />);

  it('Should render a list with 4 images', () => {
    expect(layout.find(CardMedia)).toHaveLength(4);
  });
});
