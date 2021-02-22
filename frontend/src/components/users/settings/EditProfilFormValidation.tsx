import * as yup from 'yup';

export const validateFormat = (fieldName, value, format) => {
  const error = validateRequired(fieldName, value);

  if (error) {
    return error;
  }

  if (!error && !format.test(value)) {
    return `Invalid ${fieldName.toLowerCase()}`;
  }

  return error;
};

export const validateRequired = (fieldName, value) => {
  let error;
  if (!value) {
    return `${fieldName} is required!`;
  }
  return error;
};
