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
  })
);

interface ModalProps {
  children: ReactElement;
  openModal: boolean;
  closeModal: () => void;
}

export const ModalBox = (props: ModalProps) => {
  const { children, openModal, closeModal } = props;
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
        {children}
      </Box>
    </Modal>
  );
};
