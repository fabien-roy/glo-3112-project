import React, { FunctionComponent, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import useUploadToS3 from 'hooks/images/useUploadToS3';
import { UserAvatar } from './UserAvatar';
import SnackbarMessage from '../../SnackbarMessage';

const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
}));

export interface EditUserAvatarProps {
  src?: string | null;
  size?: string | null;
  username: string;
  setAvatarReference: (reference) => void;
}

export const EditUserAvatar: FunctionComponent<EditUserAvatarProps> = (
  props: EditUserAvatarProps
) => {
  const classes = useStyles();
  const { src, size, username } = props;
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const { uploadImage, reference, error } = useUploadToS3('posts');
  // TODO : useEditUser!

  useEffect(() => {
    setAvatarSrc(reference);
    props.setAvatarReference(reference);
  }, [reference]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files.length > 0) {
        const newFile = event.target.files[0];
        uploadImage(newFile);
      }
    }
  };

  const successMessage = reference ? (
    <SnackbarMessage
      severity="success"
      description="Avatar successfully changed"
    />
  ) : null;

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not upload image" />
  ) : null;

  return (
    <>
      <div>
        <label htmlFor="icon-button-file">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleChange}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <UserAvatar
              src={avatarSrc || src}
              username={username}
              size={size}
            />
          </IconButton>
        </label>
      </div>
      {successMessage}
      {errorMessage}
    </>
  );
};

EditUserAvatar.defaultProps = {
  src: null,
  size: null,
};
