import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import { ModalBox } from 'components/ModalBox';
import Box from '@material-ui/core/Box';

export interface DeleteModalProps {
  onDelete: () => void;
  onClose: () => void;
  open: boolean;
  username: string;
}

export const DeleteModal = (props: DeleteModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { open, onDelete, onClose, username } = props;
  return (
    <ModalBox
      openModal={open}
      closeModal={onClose}
      title={`Delete ${username}`}
    >
      <Box display="flex" mb={2}>
        <Box
          display={isMobile ? 'grid' : 'flex'}
          mx={isMobile ? 2 : 'auto'}
          width={isMobile ? 1 : 1 / 3}
        >
          <Box mr={isMobile ? 0 : 1} mb={isMobile ? 1 : 0}>
            <Button
              fullWidth={isMobile}
              onClick={onClose}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Cancel
            </Button>
          </Box>
          <Box ml={isMobile ? 0 : 1}>
            <Button
              fullWidth={isMobile}
              onClick={onDelete}
              variant="contained"
              color="primary"
              startIcon={<CancelOutlined />}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalBox>
  );
};
