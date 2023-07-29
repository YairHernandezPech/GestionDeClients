import { Crud } from "../../shared/CRUD";
import { Model, Document, Types } from "mongoose";
import { NotesDto } from "../DTO/createDTO";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientsDocument,Client } from "../../clients/model/Clients";

@Injectable()
export class NotesRepository implements Crud<ClientsDocument,NotesDto>{

    constructor(@InjectModel(Client.name) private readonly clientModel:Model<ClientsDocument>){}

    async create(noteDto: NotesDto,uuidClient): Promise<any> {
        let data = await this.clientModel.findOneAndUpdate(
            {uuid:uuidClient},
            {$push:{notes:noteDto}},
            {new:true}
        )
        return data.notes;
    }
    get() {
        throw new Error('Method not implemented.');
      }
    async getByUuid(uuidClient: string): Promise<any> {
        let data = await this.clientModel.findOne({uuid:uuidClient}).select('notes');
        return data.notes;
    }
    async update(uuidClient,uuidNote:string, noteDto:NotesDto): Promise<any> {
        let data = await this.clientModel.findOneAndUpdate(
            {uuid: uuidClient, "notes.uuid": uuidNote},
            { $set: { "notes.$": noteDto } },
            { new: true }
            );
        return data.notes;
    }
    async delete(uuidClient,uuidNote:string): Promise<any> {
        let data = await this.clientModel.updateOne(
            {uuid: uuidClient },
            {$pull:{notes:{uuid: uuidNote}}}
        );
        return data
    }
}