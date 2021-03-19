import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Post } from 'types/posts';
import { createStyles, makeStyles } from '@material-ui/core';
import { PostCard } from './PostCard';

export interface PostListProps {
  posts: Post[];
  setPosts?: () => void;
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
  const { posts: freshPosts } = props;
  const classes = useStyles();
  const [posts, setPosts] = useState(freshPosts);

  const deleteAction = (deletedPostId: string) => {
    setPosts(posts.filter((post) => post.id !== deletedPostId));
  };

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} md={4} className={classes.cardList}>
            <PostCard post={post} deleteAction={deleteAction} />
          </Grid>
        ))}
        {posts.length === 0 && (
          <Typography className={classes.noPostText}>No posts</Typography>
        )}
      </Grid>
    </Box>
  );
};

PostList.defaultProps = {
  loggedUser: null,
};

export default PostList;
