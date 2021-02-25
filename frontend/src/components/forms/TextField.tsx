import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { FieldProps, getIn } from 'formik';

interface FormFieldProps extends FieldProps {
  label: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
}

export const FormTextField: React.FC<FormFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const { label, placeholder, multiline, rows } = props;
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormControl fullWidth error={!!errorText}>
      <TextField
        color="primary"
        rows={rows || 1}
        multiline={multiline || false}
        label={label}
        placeholder={placeholder}
        {...field}
      />
      <FormControl>{errorText}</FormControl>
    </FormControl>
  );
};

export default FormTextField;
