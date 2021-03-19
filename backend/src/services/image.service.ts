import { S3Client } from '../clients/s3.client';
import { BadRequestError } from '../types/errors';
import { logger } from '../middlewares/logger';

const DATA_TYPE_REGEX = /^data:image\/(?:png|jpeg)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
const MAX_FILE_SIZE_IN_BYTES = 2000000;

export class ImageService {
  private s3Client: S3Client = new S3Client();

  public async uploadAvatar(avatarData: string): Promise<string> {
    logger.info('Uploading avatar');

    const buffer = ImageService.validateImage(avatarData);
    return this.s3Client.uploadAvatar(buffer);
  }

  private static validateImage(data: string): Buffer {
    ImageService.validateDataType(data);

    const parsedData = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(parsedData, 'base64');
    ImageService.validateBufferSize(buffer);

    return buffer;
  }

  private static validateDataType(data: string) {
    if (!DATA_TYPE_REGEX.test(data)) {
      throw new BadRequestError('Invalid image type (not JPEG or PNG)');
    }
  }

  private static validateBufferSize(buffer: Buffer) {
    if (buffer.byteLength > MAX_FILE_SIZE_IN_BYTES) {
      throw new BadRequestError('Image too large (over 2mb)');
    }
  }
}
