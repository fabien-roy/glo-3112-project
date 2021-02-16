import React, { FunctionComponent, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from './UserAvatar';
import useUploadToS3 from '../../hooks/images/useUploadToS3';

const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
}));

export interface EditUserAvatarProps {
  src?: string | null;
  size?: string | null;
  username: string;
}

export const EditUserAvatar: FunctionComponent<EditUserAvatarProps> = (
  props: EditUserAvatarProps
) => {
  const [file, setFile] = useState<File | null>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const [reference, error] = useUploadToS3(file, 'avatars');

  useEffect(() => {
    setAvatarSrc(reference);
  }, [reference]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files.length > 0) {
        const newFile = event.target.files[0];
        setFile(newFile);
      }
    }
  };

  const classes = useStyles();
  const { src, size, username } = props;

  return (
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
          <UserAvatar src={avatarSrc || src} username={username} size={size} />
        </IconButton>
      </label>
    </div>
  );
};

EditUserAvatar.defaultProps = {
  src: null,
  size: null,
};
