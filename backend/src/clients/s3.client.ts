const AVATAR_BUCKET = 'avatars';

export class S3Client {
  public async uploadAvatar(buffer: Buffer): Promise<string> {
    const data = this.toData(buffer, AVATAR_BUCKET);
    return data.Key; // TODO : Return actual path to image
  }

  private toData(buffer: Buffer, bucket: string) {
    return {
      Bucket: bucket,
      Key: this.createFilename(),
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };
  }

  private createFilename() {
    return 'filename'; // TODO : Generate random filename
  }
}
