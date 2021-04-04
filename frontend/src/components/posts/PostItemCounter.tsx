import { createStyles, makeStyles, Typography } from '@material-ui/core';
import {
  Chat,
  Favorite,
  LocalOffer,
  SupervisorAccount,
} from '@material-ui/icons';
import React from 'react';
import { Reaction, UserComment } from 'types/posts';

export interface PostItemCounter {
  items?: string[] | Reaction[] | UserComment[];
  type: 'usertags' | 'hashtags' | 'reactions' | 'comments';
}

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    countText: {
      color: '#9c27b0',
    },
  })
);

export const PostItemCounter: React.FC<PostItemCounter> = (
  props: PostItemCounter
) => {
  const classes = useStyles();

  const icons = {
    usertags: (
      <SupervisorAccount
        titleAccess="Usertags"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
    hashtags: (
      <LocalOffer
        titleAccess="Hashtags"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
    reactions: (
      <Favorite
        titleAccess="Reactions"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
    comments: (
      <Chat
        titleAccess="Comments"
        aria-label={props.type}
        className={classes.icon}
      />
    ),
  };

  return (
    <>
      {icons[props.type]}
      <Typography variant="body2" className={classes.countText}>
        {props.items?.length || '0'}
      </Typography>
    </>
  );
};

export default PostItemCounter;
