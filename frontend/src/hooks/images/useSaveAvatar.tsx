import useSaveToS3 from './useSaveToS3';

// TODO : Use this
export default function useSaveAvatar(file) {
  return useSaveToS3(file, 'avatars');
}
