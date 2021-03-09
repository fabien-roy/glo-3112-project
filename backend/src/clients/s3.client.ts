import AWS, { AWSError } from 'aws-sdk';
import { PutObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const AVATAR_DIRECTORY = 'avatars';
const BUCKET = process.env.AWS_IMAGE_BUCKET || '';
const BASE_URL = process.env.AWS_IMAGE_BASE_URL || '';

export class S3Client {
  private S3 = new AWS.S3();

  // TODO : Remove console logs
  public async uploadAvatar(buffer: Buffer): Promise<string> {
    const data = this.toData(buffer, AVATAR_DIRECTORY);
    return this.uploadImage(data)
      .then(() => {
        const imageReference = this.getImageReference(data.Key);
        console.log('From S3Client');
        console.log(imageReference);
        return imageReference;
      })
      .catch((err) => {
        console.log('Image upload error!');
        console.log(err);
        throw err;
      });
  }

  private toData(buffer: Buffer, directory: string): PutObjectRequest {
    return {
      Bucket: BUCKET,
      Key: `${directory}/${this.createFilename()}`,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };
  }

  private createFilename() {
    return 'filename.jpg'; // TODO : Generate random filename
  }

  private uploadImage(
    data: PutObjectRequest,
  ): Promise<PromiseResult<PutObjectOutput, AWSError>> {
    return this.S3.putObject(data).promise();
  }

  private getImageReference(key: string): string {
    return `${BASE_URL}/${key}`;
  }
}
