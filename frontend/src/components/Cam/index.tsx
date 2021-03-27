import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import { Box, makeStyles } from '@material-ui/core';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';

import { ImagePreview } from './ImagePreview';

import 'react-html5-camera-photo/build/css/index.css';
import './index.css';

export interface CamProps {
  isMobile: boolean;
  onPictureSnap: (data) => void;
}

const useStyles = makeStyles(() => ({
  fullScreenCameraIcon: {
    position: 'absolute',
    top: 2,
    right: 4,
  },
  cameraIcon: {
    position: 'absolute',
    top: 0,
    right: 2,
  },
  cameraStream: {
    display: 'block',
  },
  mobileCameraContainer: {
    position: 'relative',
  },
}));

const Cam = (props: CamProps) => {
  const { isMobile } = props;
  const classes = useStyles();
  const [photoDataUri, setPhotoDataUri] = useState(undefined);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const fullScreenHandle = useFullScreenHandle();

  const handleTakePhotoAnimationDone = (dataUri) => {
    setPhotoDataUri(dataUri);
    props.onPictureSnap(dataUri);
  };

  const resetPreview = () => {
    setPhotoDataUri('');
    props.onPictureSnap(undefined);
  };

  return (
    <Box>
      {photoDataUri && (
        <ImagePreview
          dataUri={photoDataUri}
          isFullscreen={isMobile}
          onReset={resetPreview}
        />
      )}

      {!photoDataUri && !isMobile && (
        <Camera onTakePhotoAnimationDone={handleTakePhotoAnimationDone} />
      )}

      {!photoDataUri && isMobile && (
        <Box className={classes.mobileCameraContainer}>
          <FullScreen handle={fullScreenHandle}>
            <Camera
              className={classes.cameraStream}
              onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
              isFullscreen={fullScreenMode}
            />
            {fullScreenMode && (
              <BackspaceOutlinedIcon
                fontSize="large"
                className={classes.fullScreenCameraIcon}
                color="primary"
                onClick={() => {
                  setFullScreenMode(false);
                  fullScreenHandle.exit();
                }}
              />
            )}
          </FullScreen>
          {!fullScreenMode && (
            <AspectRatioIcon
              className={classes.cameraIcon}
              color="primary"
              onClick={() => {
                setFullScreenMode(true);
                fullScreenHandle.enter();
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Cam;
