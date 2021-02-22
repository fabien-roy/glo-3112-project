import React, { useState } from 'react';
import { FieldProps, getIn } from 'formik';
import { FormControl, IconButton } from '@material-ui/core';

// TODO : Use label and placeholder or remove them
interface FormImageUploadFieldProps extends FieldProps {
  label: string;
  placeholder: string;
  test: (File) => void;
  handleChange: (event) => void;
}

// TODO : Write tests for ImageField
// TODO : Write stories for ImageField
export const FormImageUploadField: React.FC<FormImageUploadFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const [reference, setReference] = useState<string | ArrayBuffer | null>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
    const newFile = event.target.files[0];
    props.test(newFile);
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
      <label htmlFor="icon-button-file">
        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={(event) => {
            handleImageChange(event);
            props.handleChange(event);
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        />
      </label>
      {typeof reference === 'string' && <img src={reference} alt="" />}
      <FormControl>{errorText}</FormControl>
    </FormControl>
  );
};

export default FormImageUploadField;
