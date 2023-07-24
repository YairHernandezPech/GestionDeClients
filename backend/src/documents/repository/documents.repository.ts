import { Injectable } from '@nestjs/common';
import { Crud } from "../../shared/CRUD";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document, Types } from "mongoose";
import { DocumentsDto } from "../DTO/createDTO";
import { ClientsDocument,Client } from "../../clients/model/Clients";


@Injectable()
export class DocumentsRepository implements Crud<ClientsDocument, DocumentsDto> {
  constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientsDocument>) { }

  async create(documentDto: DocumentsDto, uuid): Promise<any> {
    let data = await this.clientModel.findOneAndUpdate(
      {uuid:uuid},
      {$push:{documents:documentDto}},
      {new:true}
    );
    return data.documents;
  }

  get() {
    throw new Error('Method not implemented.');
  }

  async getByUuid(uuid: string): Promise<any> {
    let data = await this.clientModel.findOne({uuid}).select('documents');
    return data.documents;
  }
  update(_id: string, data: DocumentsDto): Promise<ClientsDocument> {
    throw new Error('Method not implemented.');
  }

    async delete(uuidClient, uuidDocument:string ): Promise<any> {
    let data = await this.clientModel.updateOne(
      { uuid: uuidClient },
      {$pull:{documents:{key: uuidDocument}}}
      )
    return data
  }

}