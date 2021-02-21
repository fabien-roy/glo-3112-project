import { useState } from 'react';
import { generateRandomFilename } from 'util/generateRandomFilename';
import S3Service from 'services/S3Service';

export default function useUploadToS3(dirName) {
  const [reference, setReference] = useState(null);
  const [error, setError] = useState(null);

  const uploadImage = (file) => {
    if (file) {
      const newFile = new File([file], generateRandomFilename(file.name), {
        type: file.type,
      });

      S3Service.uploadFile(newFile, dirName)
        .then((response) => setReference(response.location))
        .catch((err) => setError(err));
    }
  };

  return { uploadImage, reference, error };
}
