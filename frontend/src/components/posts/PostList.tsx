import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Post } from 'types/posts';
import { createStyles, makeStyles } from '@material-ui/core';
import { PostCard } from './PostCard';
import useGetUsers from '../../hooks/users/useGetUsers';
import { User } from '../../types/users';

export interface PostListProps {
  posts: Post[];
  loggedUser?: User | null;
}

const useStyles = makeStyles(() =>
  createStyles({
    cardList: {
      display: 'flex',
    },
  })
);

export const PostList = (props: PostListProps) => {
  const { posts, loggedUser } = props;
  const { users } = useGetUsers();
  const classes = useStyles();
  return users && users.length > 0 ? (
    <Box mt={2}>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} md={4} className={classes.cardList}>
            <PostCard
              id={post._id}
              description={post.description}
              reference={post.reference}
              hashtags={post.hashtags}
              usertags={post.usertags}
              username={post.user}
              avatarReference={
                users.find((user) => user.username === post.user)!
                  .avatarReference || ''
              }
              createdAt={post.createdAt}
              loggedUser={loggedUser}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <div />
  );
};

PostList.defaultProps = {
  loggedUser: null,
};

export default PostList;
