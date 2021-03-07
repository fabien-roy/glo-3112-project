import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const AVATAR_BUCKET = 'avatars';

export class S3Client {
  private S3 = new AWS.S3();

  public async uploadAvatar(buffer: Buffer): Promise<string> {
    const data = this.toData(buffer, AVATAR_BUCKET);
    return data.Key; // TODO : Return actual path to image
  }

  private toData(buffer: Buffer, bucket: string): PutObjectRequest {
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

  private uploadImage(data: PutObjectRequest) {
    this.S3.putObject(data, (err, fileData) => {
      if (err) {
        console.log('Image upload did not work!')
        console.log(err)
      } else {
        console.log('Image upload success!')
        console.log(fileData);
      }
    });
  }
}
