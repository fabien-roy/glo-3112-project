import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Post } from 'types/posts';
import { Link } from 'react-router-dom';
import { CardMedia, useMediaQuery } from '@material-ui/core';

export interface SearchImagesProps {
  posts: Post[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
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

export const SearchImages = (postprops: SearchImagesProps) => {
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
