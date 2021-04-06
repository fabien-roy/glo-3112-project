import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Post } from 'types/posts';
import { theme } from 'layouts/Theme';
import useReactToPost from 'hooks/posts/useReactToPost';

export interface LikePostButtonProps {
  post: Post;
  successAction: (newPost: Post) => void;
  fullWidth?: boolean;
}

const useStyles = makeStyles(() => ({
  liked: {
    color: theme.palette.primary.main,
  },
}));

export const LikePostButton: React.FC<LikePostButtonProps> = (
  props: LikePostButtonProps
) => {
  const classes = useStyles();
  const { reactToPost } = useReactToPost(props.post.id);

  return (
    <Button onClick={() => reactToPost()} fullWidth={props.fullWidth}>
      {false ? 'Like' : <strong className={classes.liked}>Liked</strong>}
    </Button>
  );
};

LikePostButton.defaultProps = {
  fullWidth: false,
};

export default LikePostButton;
