import { Crud } from "../../shared/CRUD";
import { User, UsersDocument } from "../model/Users"
import { Model, Document, Types } from "mongoose";
import { UsersDto } from "../DTO/createDTO"
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersRepository implements Crud<UsersDocument, UsersDto> {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UsersDocument>) { }

    async create(userDto: UsersDto): Promise<any> {
        let data = await this.userModel.create(userDto)
        console.log(data)
    }
    get() {
        throw new Error("Method not implemented.");
    }
    getByUuid() {
        throw new Error("Method not implemented.");
    }
    async update(_id:string, noteDto:UsersDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete() {
        throw new Error("Method not implemented.");
    }
}