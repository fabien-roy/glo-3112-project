import React from 'react';
import S3FileUpload from 'react-s3';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  dirName: process.env.REACT_APP_AWS_BUCKET_DIRNAME,
  region: process.env.REACT_APP_AWS_BUCKET_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

export function awsS3Connect(WrappedComponent) {
  interface awsS3ConnectProps {
    userName: string;
    src?: string;
  }

  interface awsS3ConnectState {
    src?: string;
    error: boolean;
  }
  return class extends React.Component<awsS3ConnectProps, awsS3ConnectState> {
    constructor(props) {
      super(props);
      this.state = {
        src: props.src,
        error: false,
      };
    }

    uploadFile = (file) => {
      // TODO: delete file from bucket if src once reference is saved in bd
      S3FileUpload.uploadFile(file, config)
        .then((data) => {
          const { location } = data;
          this.setState({ src: location });
        })
        .catch((err) => this.setState({ error: true }));
    };

    handleToastClose = (event: React.SyntheticEvent) => {
      this.setState({ error: false });
    };

    render() {
      const { src, error } = this.state;
      return (
        <div>
          <WrappedComponent
            {...this.props}
            src={src}
            onUpload={this.uploadFile}
          />
          <Snackbar
            open={error}
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
