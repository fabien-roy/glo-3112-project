import { useState } from 'react';
import S3Service from 'services/S3Service';

// TODO : Test this correctly
export default function useUploadToS3(file, dirName) {
  const [reference, setReference] = useState(null);
  const [error, setError] = useState(null);

  S3Service.uploadFile(file, dirName)
    .then((response) => setReference(response))
    .catch((err) => setError(err));

  return [reference, error];
}
