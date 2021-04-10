import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../middlewares/logger';
import { ExternalServiceError } from '../types/errors';
import { setupAWSConfig } from '../middlewares/aws';

setupAWSConfig();

const AVATAR_DIRECTORY = 'avatars';
const POST_DIRECTORY = 'posts';
const BUCKET = process.env.AWS_IMAGE_BUCKET || '';
const BASE_URL = process.env.AWS_IMAGE_BASE_URL || '';

export class S3Client {
  private S3 = new AWS.S3();

  public async uploadAvatar(buffer: Buffer): Promise<string> {
    const data = S3Client.toData(buffer, AVATAR_DIRECTORY);
    return this.uploadImage(data);
  }

  public async uploadPost(buffer: Buffer): Promise<string> {
    const data = S3Client.toData(buffer, POST_DIRECTORY);
    return this.uploadImage(data);
  }

  private uploadImage(data: PutObjectRequest): Promise<string> {
    return this.S3.putObject(data)
      .promise()
      .then(() => {
        return S3Client.getImageReference(data.Key);
      })
      .catch(() => {
        logger.error('Error uploading image');
        throw new ExternalServiceError('Could not upload image');
      });
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
