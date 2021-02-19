import React from 'react';
import { makeStyles } from '@material-ui/core';
import { PostCard } from './PostCard';
import { Post } from '../../types/posts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: '550px',
    margin: 10,
  },
});

export function PostList(props: { posts: Post[] }) {
  const classes = useStyles();
  const { posts } = props;
  const list = posts.map((post) => {
    return (
      <div key={post._id} className={classes.card}>
        <PostCard
          id={post._id}
          description={post.description}
          reference={post.reference}
          hashtags={post.hashtags}
          usertags={post.usertags}
          user={post.user}
        />
      </div>
    );
  });
  return <div className={classes.root}>{list}</div>;
}
export default PostList;
