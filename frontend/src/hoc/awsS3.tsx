import React from 'react';
import S3FileUpload from 'react-s3';

const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  dirName: process.env.REACT_APP_AWS_BUCKET_DIRNAME,
  region: process.env.REACT_APP_AWS_BUCKET_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  // accessKeyId: 'AKIAYQHAIOAOKQ4LSLNO',
  // secretAccessKey: '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',
};

export function awsS3Connect(WrappedComponent) {
  interface awsS3ConnectProps {
    userName: string;
    src?: string;
  }

  interface awsS3ConnectState {
    src?: string;
  }
  return class extends React.Component<awsS3ConnectProps, awsS3ConnectState> {
    constructor(props) {
      super(props);
      this.state = {
        src: props.src,
      };
    }

    uploadFile = (file) => {
      // TODO: delete file from bucket if src once reference is saved in bd
      S3FileUpload.uploadFile(file, config)
        .then((data) => {
          const { location } = data;
          this.setState({ src: location });
        })
        .catch((err) => console.error(err));
    };

    render() {
      const { src } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          src={src}
          onUpload={this.uploadFile}
        />
      );
    }
  };
}
