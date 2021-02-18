import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import PostCard from './PostCard';

const somePost = {
  id: 'asdaSDasd',
  reference: 'https://picsum.photos/500',
  description: 'a description 123123123123123',
  hashtags: ['firsttag', 'secondtag'],
  usertags: ['firstusertag', 'secondusertag'],
  user: 'testuser',
  createdAt: Date.now(),
};

describe('When rendering PostCard', () => {
  it('Should show a valid material card when valid props are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(
        <PostCard
          id={somePost.id}
          description={somePost.description}
          reference={somePost.reference}
          hashtags={somePost.hashtags}
          usertags={somePost.usertags}
          user={somePost.user}
        />
      )
    );
    expect(wrapper.contains(somePost.description)).toBeTruthy();
    expect(wrapper.contains(somePost.user)).toBeTruthy();
    expect(wrapper.contains('This post does not exist!')).toBeFalsy();
    expect(wrapper.contains('HTTP 404')).toBeFalsy();
  });

  it('Should show 404 and not an empty card when undefined props are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(
        <PostCard
          id={undefined}
          description={undefined}
          reference={undefined}
          hashtags={somePost.hashtags}
          usertags={somePost.usertags}
          user={undefined}
        />
      )
    );

    expect(wrapper.contains(somePost.description)).toBeFalsy();
    expect(wrapper.contains(somePost.user)).toBeFalsy();
    expect(wrapper.contains('This post does not exist!')).toBeTruthy();
    expect(wrapper.contains('HTTP 404')).toBeTruthy();
  });

  it('Should render PostCard', () => {
    render(<PostCard />);
  });
});
