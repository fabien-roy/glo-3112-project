import React from 'react';
import { render } from '@testing-library/react';
import SnackbarMessage from './SnackbarMessage';

describe('When rendering SnackbarMessage', () => {
  it('Should render', () => {
    render(
      <SnackbarMessage
        severity="error"
        description="This is a critical error!"
      />
    );
  });
});
