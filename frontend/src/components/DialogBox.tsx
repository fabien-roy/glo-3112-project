import { makeStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core/styles';
import { Box, Modal } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: 'auto',
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      position: 'absolute',
      textAlign: 'center',
      width: '70vw',
      maxWidth: '800px',
      backgroundColor: 'white',
      border: '2px solid #000',
      boxShadow: '5',
      padding: '2, 4, 3',
      margin: 'auto',
    },
    modalTitle: {
      backgroundColor: '#9c27b0',
      color: '#fff',
      margin: '0 0 20px 0',
      padding: '10px',
    },
  })
);

interface DialogBoxProps {
  children: ReactElement;
  openModal: boolean;
  closeModal: () => void;
  title: string;
}

export const DialogBox = (props: DialogBoxProps) => {
  const { children, openModal, closeModal, title } = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal open={openModal} onClose={() => closeModal()}>
      <Box
        style={modalStyle}
        className={classes.paper}
        margin="auto"
        width="100%"
      >
        <h2 className={classes.modalTitle}>{title}</h2>

        {children}
      </Box>
    </Modal>
  );
};

export default DialogBox;
