import Jimp from 'jimp';

export const resizeImage = async (
  buffer: Buffer,
  height: number,
  width: number,
): Promise<string> => {
  const image = await Jimp.read(buffer);
  const src = await image
    .resize(height, width)
    .quality(100)
    .getBase64Async(Jimp.MIME_JPEG);

  return src;
};
