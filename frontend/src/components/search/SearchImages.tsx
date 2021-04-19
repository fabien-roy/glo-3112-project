import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import InfiniteScroll from 'react-infinite-scroller';
import useGetPosts from 'hooks/posts/useGetPosts';
import { PostQueryParams } from 'types/posts';

import { Link } from 'react-router-dom';
import { CardMedia, Typography, useMediaQuery } from '@material-ui/core';

import { ROUTE_PATHS } from 'router/Config';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: '100%',
    },
    media: {
      paddingTop: '100%',
      backgroundSize: 'contain',
      '&:hover': {
        opacity: 0.6,
      },
    },
    loadingText: {
      fontSize: '15px',
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
  })
);

export const SearchImages = () => {
  const numberPerPage = 12;

  const classes = useStyles();
  const mobile = useMediaQuery('(max-width:600px)');
  const pad = useMediaQuery('(max-width:840px)');
  let col = 4;
  if (mobile) {
    col = 1;
  } else if (pad) {
    col = 3;
  }

  const getPostQueryParams = (
    after: string,
    limit: number
  ): PostQueryParams => ({
    after: after || undefined,
    limit: limit || undefined,
  });

  const [last, setLast] = useState('');
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  // BUG 1: NUMBER OF POST RETURNED IS NOT CONSTANT: 1ST TIME 12, OK BUT AFTER -1 EACH TIME
  const { posts } = useGetPosts(getPostQueryParams(last, numberPerPage));
  const [listPosts, setListPosts] = useState(posts.results);

  useEffect(() => {
    setListPosts(listPosts.concat(posts.results));
    console.log(posts.results.length);
    console.log(
      `fetchMore ${posts.lastKey} new posts: ${posts.results.length} total loaded: ${posts.count} total list: ${listPosts.length}`
    );
  }, [posts]);

  function fetchMoreItems() {
    const { lastKey } = posts;
    const loaded = listPosts.length > posts.count;
    setLoadingCompleted(loaded);
    if (loaded) return;
    setTimeout(() => {
      setLast(lastKey);
    }, 200);
  }

  return (
    <div className={classes.root}>
      <div
        id="scrollTable"
        style={{ width: '100%', overflow: 'auto', maxHeight: 600 }}
      >
        <InfiniteScroll
          loadMore={fetchMoreItems}
          hasMore
          threshold={50}
          useWindow={false}
          loader={
            <div className="loader" key={0}>
              {loadingCompleted === false && (
                <Typography className={classes.loadingText}>
                  Loading ...
                </Typography>
              )}
            </div>
          }
        >
          <GridList cellHeight="auto" className={classes.gridList} cols={col}>
            {listPosts.map((post) => (
              // BUG 2 KEY IS PATCH FOR NOT UNIQUE POSTID... (SIDE EFFECT OF BUG 1)
              <GridListTile key={listPosts.indexOf(post)} rows={1}>
                <Link to={ROUTE_PATHS.post(post?.id)}>
                  <CardMedia
                    className={classes.media}
                    image={post.reference}
                    component="div"
                  />
                </Link>
              </GridListTile>
            ))}
          </GridList>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchImages;
