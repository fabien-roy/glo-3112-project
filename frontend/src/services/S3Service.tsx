import S3 from 'react-s3';

// const config = {
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   bucketName: process.env.S3_BUCKET_NAME,
//   region: process.env.S3_BUCKET_REGION,
// };

const config = {
  accessKeyId: 'AKIAYQHAIOAOECPWAJPT',
  secretAccessKey: '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',
  bucketName: 'test--omar',
  region: 'ca-central-1',
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
