import { Crud } from "../../shared/CRUD";
import { Client, ClientsDocument } from "../model/Clients";
import { Model, Document, Types } from "mongoose";
import { ClientsDto } from "../DTO/createDTO";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ClientsRepository implements Crud<ClientsDocument, ClientsDto>{

    constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientsDocument>) { }


    async create(clientDto: ClientsDto): Promise<any> {
        let data = await this.clientModel.create(clientDto)
        return data;
    }
    async get(skip,limit,item): Promise<any[]> {
        let data = await this.clientModel.find(item).skip(skip).limit(limit);
        return data;
    }
    getByUuid() {
        throw new Error("Method not implemented.");
    }
    async update(uuid: string, clientDto: ClientsDto): Promise<any> {
        let data = await this.clientModel.findOneAndUpdate({uuid}, clientDto, { new: true });
        return data;
    }
    async delete(uuid: string): Promise<any> {
        let data = await this.clientModel.findOneAndDelete({uuid});
        return data
    }
}