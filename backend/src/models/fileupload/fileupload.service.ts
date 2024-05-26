import { Injectable } from '@nestjs/common';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import * as path from 'path';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FileuploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ap-south-1',
  });

  async uploadFile(fileName: string, file: Buffer, mimetype: string) {
    //File name is generated randomly
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const fileExtension = path.extname(fileName);
    fileName = `${randomName}${fileExtension}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || 'dev-presidio-hack',
        Key: fileName,
        Body: file,
        ContentType: mimetype,
      }),
    );
    return fileName;
  }

  async getSignedUrl(fileName: string): Promise<string> {
    const command = getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || 'dev-presidio-hack',
        Key: fileName,
      }),
    );
    const signedurl = await command;
    return signedurl;
  }

  findAll() {
    return `This action returns all fileupload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileupload`;
  }

  update(id: number, updateFileuploadDto: UpdateFileuploadDto) {
    return `This action updates a #${id} fileupload`;
  }

  async deleteFile(fileName: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || 'dev-presidio-hack',
        Key: fileName,
      }),
    );
    return 'File deleted successfully';
  }
}
