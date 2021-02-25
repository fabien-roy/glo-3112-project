import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      paddingTop: '56.25%', // 16:9
      backgroundSize: 'contain',
    },
  })
);

export interface PostImageProps {
  reference?: string;
}

export const PostImage: React.FC<PostImageProps> = (props: PostImageProps) => {
  const { reference } = props;
  const classes = useStyles();

  return (
    <CardMedia className={classes.media} image={reference} component="div" />
  );
};

export default PostImage;
