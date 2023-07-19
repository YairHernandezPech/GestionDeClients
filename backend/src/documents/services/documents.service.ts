import { Injectable } from '@nestjs/common';
import { MulterFile } from 'multer';
import { DocumentsRepository } from "../repository/documents.repository";
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { AwsConfig } from '../aws.confing';
import { DocumentsDto } from "../DTO/createDTO";

@Injectable()
export class DocumentsService {
  private s3: S3;
  constructor(private readonly documentsRepository: DocumentsRepository, private readonly awsConfig: AwsConfig) {
    this.s3 = new S3({
      accessKeyId: this.awsConfig.accessKeyId,
      secretAccessKey: this.awsConfig.secretAccessKey,
      region: this.awsConfig.region,
    });
  }

  async create(file: MulterFile, obj: DocumentsDto): Promise<any> {
    try {
      const uploadParams = {
        Bucket: this.awsConfig.bucketName,
        Key: `${uuid()}-${file.originalname}`,
        Body: file.buffer,
      };
      const keyImg = uploadParams.Key
      obj.key = keyImg;
      const newDocument = await this.documentsRepository.create(this.s3, uploadParams, obj)
      return newDocument
    }
    catch (err) {
      console.log(err)
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const document = await this.documentsRepository.get()
      return document;

    } catch (error) {
      console.log(error)
    }
  }
  async delete(key: string): Promise<any> {
    try {
      const params = {
        Bucket: this.awsConfig.bucketName,
        Key: key,
      };
      await this.documentsRepository.delete(this.s3, params, key);
    } catch (err) {
      console.log(err);
    }
  }


}
