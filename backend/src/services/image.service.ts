import { S3Client } from '../clients/s3.client';

export class ImageService {
  private s3Client: S3Client = new S3Client();

  public async uploadAvatar(avatarData: string): Promise<string> {
    const buffer = this.toBuffer(avatarData);
    // TODO : Validate if buffer is an image
    // TODO : Validate if buffer is correct file size
    // TODO : Validate if buffer is correct file type
    return this.s3Client.uploadAvatar(buffer);
  }

  private toBuffer(data: string): Buffer {
    return Buffer.from(data, 'base64');
  }
}
