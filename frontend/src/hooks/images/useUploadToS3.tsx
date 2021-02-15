import { useState } from 'react';
import { generateRandomFilename } from 'util/generateRandomFilename';
import S3Service from 'services/S3Service';

// TODO : Test this correctly
export default function useUploadToS3(file, dirName) {
  const [reference, setReference] = useState(null);
  const [error, setError] = useState(null);

  let newFile = file;
  newFile.name = generateRandomFilename(file.name);

  // TODO : Do we have to use useEffect (like in useAPI?)
  S3Service.uploadFile(newFile, dirName)
    .then((response) => setReference(response.location))
    .catch((err) => setError(err));

  return [reference, error];
}
