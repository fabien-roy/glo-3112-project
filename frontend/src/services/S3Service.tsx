import S3FileUpload from 'react-s3';

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.S3_BUCKET_NAME,
  region: process.env.S3_BUCKET_REGION,
};

const uploadFile = (file, dirName) => {
  return S3FileUpload.uploadFile(file, {
    ...config,
    dirName,
  });
};

export default {
  uploadFile,
};
