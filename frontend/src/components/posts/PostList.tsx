import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LoadingSpinner from 'components/LoadingSpinner';
import InfiniteScroll from 'react-infinite-scroller';
import Typography from '@material-ui/core/Typography';
import useGetPosts from 'hooks/posts/useGetPosts';
import { Post, PostQueryParams } from 'types/posts';
import { createStyles, makeStyles } from '@material-ui/core';
import { PostCard } from './PostCard';

export interface PostListProps {
  posts: Post[];
  setPosts?: () => void;
  refreshPosts: () => void;
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

export const PostList = (props: PostListProps) => {
  const { refreshPosts } = props;
  const classes = useStyles();

  const getPostQueryParams = (
    before: string,
    limit?: number
  ): PostQueryParams => ({
    before: before || undefined,
    limit: limit || undefined,
  });

  const [last, setLast] = useState('');
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  const { posts } = useGetPosts(getPostQueryParams(last));
  const [listPosts, setListPosts] = useState(posts.results);

  useEffect(() => {
    setListPosts(listPosts.concat(posts.results));
  }, [posts]);

  function fetchMoreItems() {
    const { lastKey } = posts;
    const loaded = listPosts.length >= posts.count;
    setLoadingCompleted(loaded);
    if (loaded) return;
    setTimeout(() => {
      setLast(lastKey);
    }, 200);
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
        <Grid container spacing={2}>
          {listPosts.map((post) => (
            <Grid
              item
              key={post.id}
              xs={12}
              md={4}
              className={classes.cardList}
            >
              <PostCard post={post} refreshPost={refreshPosts} />
            </Grid>
          ))}
          {listPosts.length === 0 && (
            <Typography className={classes.noPostText}>No posts</Typography>
          )}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

PostList.defaultProps = {
  loggedUser: null,
};

export default PostList;
