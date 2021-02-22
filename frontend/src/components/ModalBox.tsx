import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core/styles';
import { Box, Modal } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

// TODO : Fix styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      textAlign: 'center',
      width: '70vw',
      height: '70vh',
      // backgroundColor: theme.palette.background.paper,
      backgroundColor: 'white',
      border: '2px solid #000',
      // boxShadow: theme.shadows[5],
      boxShadow: '5',
      padding: '2, 4, 3',
      // padding: theme.spacing(2, 4, 3),
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
      <Box style={modalStyle} className={classes.paper}>
        {children}
      </Box>
    </Modal>
  );
};
