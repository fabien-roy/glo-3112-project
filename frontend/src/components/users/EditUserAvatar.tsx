import React, { FunctionComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { UserAvatar } from './UserAvatar';

const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
}));

export interface EditUserAvatarProps {
  src?: string | null;
  size?: string | null;
  username: string;
  onUpload: (file: File) => void;
}

export const EditUserAvatar: FunctionComponent<EditUserAvatarProps> = (
  props: EditUserAvatarProps
) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        props.onUpload(file);
      }
    }
  };

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
          <UserAvatar {...props} />
        </IconButton>
      </label>
    </div>
  );
};

EditUserAvatar.defaultProps = {
  src: null,
  size: null,
};
