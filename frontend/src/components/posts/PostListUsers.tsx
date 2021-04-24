import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import LoadingSpinner from 'components/LoadingSpinner';
import InfiniteScroll from 'react-infinite-scroller';
import useGetPosts from 'hooks/posts/useGetPosts';
import { Post, PostQueryParams } from 'types/posts';
import PostList from 'components/posts/PostList';
import { createStyles, makeStyles } from '@material-ui/core';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import _ from 'lodash';

export interface PostListProps {
  posts: Post[];
  setPosts?: () => void;
  refreshPosts: () => void;
  username: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    cardList: {
      display: 'flex',
    },
    noPostText: {
      margin: 'auto',
    },
  })
);

export const PostListUsers = (props: PostListProps) => {
  const { refreshPosts, username } = props;
  const classes = useStyles();

  const getUserQueryParams = (
    before: string,
    limit?: number
  ): PostQueryParams => ({
    before: before || undefined,
    limit: limit || undefined,
  });

  const [last, setLast] = useState('');
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  const { posts } = useGetUserPosts(username, getUserQueryParams(last));
  const [listPosts, setListPosts] = useState(posts.results);

  useEffect(() => {
    // setListPosts(listPosts.concat(posts.results));
    const concatPost = _.unionBy(listPosts, posts.results, 'id');
    setListPosts(concatPost);
  }, [posts]);

  function fetchMoreItems() {
    const { lastKey } = posts;
    const loaded = listPosts.length >= posts.count;
    setLoadingCompleted(loaded);
    if (loaded) return;
    // setTimeout(() => {
    setLast(lastKey);
    // }, 200);
  }

  return (
    <Box mt={2}>
      <InfiniteScroll
        loadMore={fetchMoreItems}
        hasMore
        threshold={50}
        loader={
          <div className="loader" key={0}>
            {loadingCompleted === false && (
              <span>
                <br />
                <LoadingSpinner />
              </span>
            )}
          </div>
        }
      >
        <PostList posts={listPosts} refreshPosts={refreshPosts} />
      </InfiniteScroll>
    </Box>
  );
};

PostListUsers.defaultProps = {
  loggedUser: null,
};

export default PostListUsers;
