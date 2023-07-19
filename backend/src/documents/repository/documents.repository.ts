import { Injectable } from '@nestjs/common';
import { Crud } from "../../shared/CRUD";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document, Types } from "mongoose";
import { DocumentsDto } from "../DTO/createDTO";
import { Documents, DocumentsDocument } from "../model/Documents";
import { S3 } from 'aws-sdk';


@Injectable()
export class DocumentsRepository implements Crud<DocumentsDocument, DocumentsDto> {
  constructor(@InjectModel(Documents.name) private readonly documentModel: Model<DocumentsDocument>) { }

  async create(s3: S3, uploadParams, documentDto: DocumentsDto): Promise<any> {
    let newData = await s3.upload(uploadParams).promise();
    documentDto.url= newData.Location
    let data = await this.documentModel.create(documentDto);
    return data;
  }

  async get(): Promise<any> {
    let data = await this.documentModel.find();
    return data;
  }

  async delete(s3: S3, params, key): Promise<any> {
    let data = await s3.deleteObject(params).promise();
    let newData = await this.documentModel.deleteOne({ key: key })
    return { data, newData }
  }

  getByUuid() {
    throw new Error("Method not implemented.");
  }
  async update(_id: string, documentDto: DocumentsDto): Promise<any> {
    throw new Error("Method not implemented.");
  }

}