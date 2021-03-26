import React from 'react';
import { Box } from '@material-ui/core';

interface ImagePreviewProps {
  dataUri: string;
  isFullscreen: boolean;
}

export const ImagePreview = (props: ImagePreviewProps) => {
  const { dataUri, isFullscreen } = props;
  return (
    <Box>
      <img src={dataUri} alt="" />
    </Box>
  );
};
