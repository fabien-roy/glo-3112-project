import React, { useState, useEffect } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useToasts } from 'react-toast-notifications';

import TuiImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import './ImageEditor.css';

const editorProps = {
  includeUI: {
    menu: ['crop', 'flip', 'rotate', 'draw', 'filter'],
    initMenu: 'filter',
    uiSize: {
      width: '100%',
      height: '500px',
    },
    menuBarPosition: 'buttom',
  },
  cssMaxWidth: 500,
  cssMaxHeight: 200,
  selectionStyle: {
    cornerSize: 20,
    rotatingPointOffset: 70,
  },
};

const useStyles = makeStyles(() => ({
  editorButton: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '12px',
    borderRadius: '20px',
    width: '120px',
    height: '40px',
    outline: 'none',
    fontHeight: 'bold',
    margin: '0px 5px',
  },
  editorButtons: {
    display: 'flex',
    position: 'absolute',
    top: 50,
    left: -5,
    margin: '8px',
  },
  editorContainer: {
    position: 'relative',
  },
}));

const ImageEditor = ({ field, form }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const rootEl = React.createRef<HTMLDivElement>();
  const [imageEditorInst, setImageEditorInst] = useState(null);
  const { addToast } = useToasts();

  const [isChanged, setIsChanged] = useState(false);

  const handleSaveChanges = () => {
    const newReference = imageEditorInst.toDataURL();
    form.setFieldValue(field.name, newReference);
    setIsChanged(true);
  };

  useEffect(() => {
    if (isChanged) {
      addToast('Changes applied successfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
      setIsChanged(false);
    }
  }, [isChanged]);

  useEffect(() => {
    setImageEditorInst(
      new TuiImageEditor(rootEl.current, {
        ...editorProps,
      })
    );

    if (imageEditorInst) {
      window.onresize = () => {
        imageEditorInst.ui.resizeEditor();
      };
    }

    return function cleanup() {
      if (imageEditorInst) {
        imageEditorInst.destroy();
      }
      setImageEditorInst(null);
    };
  }, []);

  return (
    <Box className={classes.editorContainer}>
      <div ref={rootEl} />
      <Box className={classes.editorButtons}>
        <Button
          className={classes.editorButton}
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default ImageEditor;
