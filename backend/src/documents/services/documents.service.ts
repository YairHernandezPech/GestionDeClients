import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from "../repository/documents.repository";
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from "uuid";
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

  async create(file: Express.Multer.File, documentsDto: DocumentsDto, uuid): Promise<any> {
    try {
      const uploadParams = {
        Bucket: this.awsConfig.bucketName,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
      };

      let newDocument = await this.s3.upload(uploadParams).promise();//Aqui se guarda el documento en AWS
      documentsDto.key = newDocument.Key;//Aqui obtengo la el key del documento y lo guardo en el dto
      documentsDto.url= newDocument.Location//Aqui obtengo la url del documento y lo guardo en el dto
      
      const data = await this.documentsRepository.create(documentsDto,uuid)
      return data
    }
    catch (err) {
      console.log(err)
      throw new Error('Failed to Created');
    }
  }

  async findAll(uuid: string): Promise<any[]> {
    try {
      const document = await this.documentsRepository.getByUuid(uuid)
      return document;

    } catch (error) {
      console.log(error)
      throw new Error('Failed to Get');
    }
  }

  async delete(uuidClient:string, uuidDocument: string): Promise<any> {
    try {
      const params = {
        Bucket: this.awsConfig.bucketName,
        Key: uuidDocument,
      };
      let data = await this.s3.deleteObject(params).promise();
      await this.documentsRepository.delete(uuidClient,uuidDocument);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to Delete');
    }
  }


}