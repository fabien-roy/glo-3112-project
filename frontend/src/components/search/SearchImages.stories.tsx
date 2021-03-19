import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import { SearchImages, SearchImagesProps } from './SearchImages';

const posts = PostFactory.make(6);

export default {
  title: 'components/search/SearchImages',
  component: SearchImages,
};

const Template: Story<SearchImagesProps> = ({ ...args }) =>
  wrapInMemoryRouter(<SearchImages {...args} />);

export const WithImages = Template.bind({});

WithImages.args = {
  posts,
};
