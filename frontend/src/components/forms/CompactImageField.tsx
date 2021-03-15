import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import { FormControl, makeStyles } from '@material-ui/core';
import defaultImage from '../../assets/defaultImage.jpg';

interface CompactImageFieldProps extends FieldProps {
  label: string;
  placeholder: string;
  setFile: (File) => void;
  handleChange: (event) => void;
}

const useStyles = makeStyles(() => ({
  browseButton: {
    marginBottom: '10px',
    overflow: 'hidden',
  },
  browseButtonLabel: {
    display: 'flex',
    width: '250px',
  },
}));

export const CompactImageField: React.FC<CompactImageFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const [reference, setReference] = useState<string | ArrayBuffer | null>(
    defaultImage
  );
  const classes = useStyles();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
    const newFile = event.target.files[0];
    props.setFile(newFile);
    const reader = new FileReader();

    if (newFile) {
      reader.onloadend = () => {
        setReference(reader.result);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormControl fullWidth error={!!errorText}>
      <label htmlFor="icon-button-file" className={classes.browseButtonLabel}>
        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={(event) => {
            handleImageChange(event);
            props.handleChange(event);
          }}
          className={classes.browseButton}
        />
      </label>

      {typeof reference === 'string' && <img src={reference} alt="" />}
      <FormControl>{errorText}</FormControl>
    </FormControl>
  );
};

export default CompactImageField;
