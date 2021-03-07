import { S3Client } from '../clients/s3.client';

export class ImageService {
  private s3Client: S3Client = new S3Client();

  public async uploadAvatar(avatarData: string): Promise<string> {
    const buffer = this.toBuffer(avatarData);
    return this.s3Client.uploadAvatar(buffer);
  }

  private toBuffer(data: string): Buffer {
    return Buffer.from(data, 'base64');
  }
}
