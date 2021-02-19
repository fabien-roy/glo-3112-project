import React from 'react';
import { Story } from '@storybook/react';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import UsertagsCardSection, {
  UsertagsCardSectionProps,
} from './UsertagsCardSection';

const post = PostFactory.make();

export default {
  title: 'components/posts/UsertagsCardSection',
  component: UsertagsCardSection,
};

const Template: Story<UsertagsCardSectionProps> = ({ ...args }) =>
  wrapInMemoryRouter(<UsertagsCardSection {...args} />);

export const WithUsertags = Template.bind({});
WithUsertags.args = {
  usertags: post.usertags,
};

export const WithoutUsertag = Template.bind({});
WithoutUsertag.args = {
  usertags: [],
};
