import { Crud } from "../../shared/CRUD";
import { Note, NotesDocument } from "../model/Notes";
import { Model, Document, Types } from "mongoose";
import { NotesDto } from "../DTO/createDTO";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class NotesRepository implements Crud<NotesDocument,NotesDto>{

    constructor(@InjectModel(Note.name) private readonly noteModel:Model<NotesDocument>){}

    async create(noteDto: NotesDto): Promise<any> {
        let data = await this.noteModel.create(noteDto)
        return data;
    }
    async get(): Promise<any[]> {
        let data = await this.noteModel.find().sort({ createdAT: 'desc' })
        return data;
    }
    getByUuid() {
        throw new Error("Method not implemented.");
    }
    async update(uuid:string, noteDto:NotesDto): Promise<any> {
        let data = await this.noteModel.findOneAndUpdate({uuid}, noteDto, { new: true });
        return data;
    }
    async delete(uuid:string): Promise<any> {
        let data = await this.noteModel.findOneAndDelete({uuid});
        return data
    }
}