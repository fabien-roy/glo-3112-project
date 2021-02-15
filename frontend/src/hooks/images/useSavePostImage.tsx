import useSaveToS3 from './useSaveToS3';

// TODO : Use this
export default function useSavePostImage(file) {
  return useSaveToS3(file, 'posts');
}
