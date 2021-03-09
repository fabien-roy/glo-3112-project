import { S3Client } from '../clients/s3.client';
import { BadRequestError } from '../types/errors';

// TODO : Use winston to log some things
export class ImageService {
  private s3Client: S3Client = new S3Client();

  public async uploadAvatar(avatarData: string): Promise<string> {
    ImageService.validateDataType(avatarData);
    // TODO : Validate if data is correct file size

    const buffer = ImageService.toBuffer(avatarData);
    return this.s3Client.uploadAvatar(buffer);
  }

  // TODO : Test this
  private static validateDataType(data: string) {
    // TODO : Check if png and jpeg are the only accepted types
    const dataTypeRegex = /^data:image\/(?:png|jpeg)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g;

    if (!dataTypeRegex.test(data)) {
      throw new BadRequestError('Invalid image type');
    }
  }

  private static toBuffer(data: string): Buffer {
    return Buffer.from(data, 'base64');
  }
}
