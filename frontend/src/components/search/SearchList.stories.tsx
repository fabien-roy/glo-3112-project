import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { UserFactory } from 'factories/UserFactory';
import { PostFactory } from 'factories/PostFactory';
import { SearchList, SearchListProps } from './SearchList';

export default {
  title: 'components/search/SearchList',
  component: SearchList,
};

const Template: Story<SearchListProps> = ({ ...args }) =>
  wrapInMemoryRouter(<SearchList {...args} />);

export const WithUser = Template.bind({});
WithUser.args = {
  tab: 0,
  users: UserFactory.make(3),
};

export const WithHashtagsPosts = Template.bind({});
WithHashtagsPosts.args = {
  tab: 1,
  hashtagPosts: PostFactory.make(3),
};
