import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Post } from 'types/posts';
import { ROUTE_PATHS } from 'router/Config';
import { Link } from 'react-router-dom';
import { theme } from 'layouts/Theme';

export interface CommentPostProps {
  post: Post;
  successAction: (newPost: Post) => void;
  fullWidth?: boolean;
}

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

export const CommentPost: React.FC<CommentPostProps> = (
  props: CommentPostProps
) => {
  const classes = useStyles();

  return (
    <Button fullWidth={props.fullWidth}>
      <Link to={ROUTE_PATHS.post(props.post?.id)} className={classes.link}>
        Comment
      </Link>
    </Button>
  );
};

CommentPost.defaultProps = {
  fullWidth: false,
};

export default CommentPost;
