import AWS, { AWSError } from 'aws-sdk';
import { PutObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { v4 as uuidv4 } from 'uuid';
import { ExternalServiceError } from '../types/errors';

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

  public async uploadAvatar(buffer: Buffer): Promise<string> {
    const data = S3Client.toData(buffer, AVATAR_DIRECTORY);
    return this.uploadImage(data)
      .then(() => {
        return S3Client.getImageReference(data.Key);
      })
      .catch(() => {
        throw new ExternalServiceError('Could not upload image');
      });
  }

  private uploadImage(
    data: PutObjectRequest,
  ): Promise<PromiseResult<PutObjectOutput, AWSError>> {
    return this.S3.putObject(data).promise();
  }

  private static toData(buffer: Buffer, directory: string): PutObjectRequest {
    return {
      Bucket: BUCKET,
      Key: `${directory}/${S3Client.createRandomFilename()}`,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };
  }

  private static createRandomFilename() {
    return `${uuidv4()}.jpg`;
  }

  private static getImageReference(key: string): string {
    return `${BASE_URL}/${key}`;
  }
}
