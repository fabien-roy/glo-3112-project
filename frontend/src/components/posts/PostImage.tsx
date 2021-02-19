import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() =>
  createStyles({
    wide: {
      paddingTop: '56.25%', // 16:9
    },
    small: {
      paddingTop: '56.25%',
    },
  })
);

export interface PostImageProps {
  reference?: string;
  paddingClass?: string;
}

export const PostImage: React.FC<PostImageProps> = (props: PostImageProps) => {
  const { reference, paddingClass } = props;

  const classes = useStyles();

  return (
    <CardMedia
      className={paddingClass === 'wide' ? classes.wide : classes.small}
      image={reference}
      component="div"
    />
  );
};

PostImage.defaultProps = {
  paddingClass: 'wide',
};

export default PostImage;
