import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { uploadToS3 } from '../hooks/images/useUploadToS3';

// TODO : Use this instead of awsS3
export function withEditableAvatar(WrappedComponent) {
  interface withEditableAvatarProps {
    username: string;
    src?: string | null;
  }

  interface withEditableAvatarState {
    reference?: string | null;
    showToast: boolean;
  }

  return class extends React.Component<
    withEditableAvatarProps,
    withEditableAvatarState
  > {
    constructor(props) {
      super(props);
      this.state = {
        reference: props.src,
        showToast: false,
      };
    }

    uploadFile = async (file) => {
      const [reference, error] = await uploadToS3(file, 'avatars');
      console.log(reference);
      this.setState({ reference });

      if (error) {
        this.setState({ showToast: true });
      }
    };

    handleToastClose = () => {
      this.setState({ showToast: false });
    };

    render() {
      const { reference, showToast } = this.state;
      return (
        <div>
          <WrappedComponent
            {...this.props}
            src={reference}
            onUpload={this.uploadFile}
          />
          <Snackbar
            open={showToast}
            autoHideDuration={6000}
            onClose={this.handleToastClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={this.handleToastClose}
              severity="error"
            >
              Something went wrong! Please try to reupload the image.
            </MuiAlert>
          </Snackbar>
        </div>
      );
    }
  };
}
