import S3 from 'react-s3';

const config = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
  region: process.env.REACT_APP_S3_BUCKET_REGION,
};

const uploadFile = (file, dirName) => {
  return S3.uploadFile(file, {
    ...config,
    dirName,
  });
};

export default {
  uploadFile,
};
