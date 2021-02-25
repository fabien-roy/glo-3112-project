export const validateFormat = (fieldName, value, format) => {
  const error = validateRequired(fieldName, value);

  return !error && !format.test(value)
    ? `Invalid ${fieldName.toLowerCase()}`
    : error;
};

export const validateRequired = (fieldName, value) =>
  value ? '' : `${fieldName} is required!`;
