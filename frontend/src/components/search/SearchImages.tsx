import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Post } from 'types/posts';
import { Link } from 'react-router-dom';
import { CardMedia, isWidthUp, useMediaQuery } from '@material-ui/core';

export interface PostListProps {
  posts: Post[];
  setPosts?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    gridList: {
      width: '80%',
      height: 'auto',
    },
    media: {
      paddingTop: '100%',
      backgroundSize: 'contain',
      '&:hover': {
        opacity: 0.6,
      },
    },
  })
);

export const SearchImages = (postprops: PostListProps) => {
  const { posts } = postprops;
  const classes = useStyles();
  const mobile = useMediaQuery('(max-width:600px)');
  const pad = useMediaQuery('(max-width:840px)');
  let col = 4;
  if (mobile) {
    col = 1;
  } else if (pad) {
    col = 3;
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList} cols={col}>
        {posts.map((post) => (
          <GridListTile key={post.id} rows={1}>
            <Link to={`/posts/${post?.id}`}>
              <CardMedia
                className={classes.media}
                image={post.reference}
                component="div"
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default SearchImages;
