import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import TuiImageEditor from 'tui-image-editor';
import { useToasts } from 'react-toast-notifications';

import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import './ImageEditor.css';

const editorProps = {
  includeUI: {
    menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'filter', 'text'],
    initMenu: 'filter',
    uiSize: {
      width: '100%',
      height: '700px',
    },
    menuBarPosition: 'left',
  },
  cssMaxWidth: 700,
  cssMaxHeight: 500,
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
    top: 0,
    right: 130,
    margin: '8px',
  },
  editorContainer: {
    position: 'relative',
  },
}));

const ImageEditor = ({ field, form, ...props }) => {
  const classes = useStyles();
  const [rootEl, setRootEl] = useState(React.createRef<HTMLDivElement>());
  const [imageEditorInst, setImageEditorInst] = useState(null);
  const { addToast } = useToasts();

  const [reference, setReference] = useState<string | ArrayBuffer | null>(null);

  const [isChanged, setIsChanged] = useState(false);

  const handleSaveChanges = () => {
    const newReference = imageEditorInst.toDataURL();
    setReference(newReference);
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
