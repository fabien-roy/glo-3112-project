import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Box, makeStyles } from '@material-ui/core';

interface ImagePreviewProps {
  dataUri: string;
  isFullscreen: boolean;
  onReset: () => void;
}

const useStyles = makeStyles(() => ({
  closeIcon: {
    position: 'absolute',
    top: 1,
    right: 3,
  },
  image: {
    display: 'block',
  },
  imagePreviewContainer: {
    position: 'relative',
  },
}));

export const ImagePreview = (props: ImagePreviewProps) => {
  const { dataUri, isFullscreen } = props;
  const classes = useStyles();
  return (
    <Box className={classes.imagePreviewContainer}>
      <img className={classes.image} src={dataUri} alt="" />
      <CloseIcon
        color="primary"
        onClick={props.onReset}
        className={classes.closeIcon}
      />
    </Box>
  );
};
