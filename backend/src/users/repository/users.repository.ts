import { Crud } from '../../shared/CRUDUser';
import { User, UsersDocument } from '../model/Users';
import { Model } from 'mongoose';
import { UsersDto } from '../DTO/createDTO';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository implements Crud<UsersDocument, UsersDto> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
  ) {}

  async create(userDto: UsersDto): Promise<any> {
    const newUser = await this.userModel.create(userDto);
    return newUser;
  }

  async get(): Promise<any[]> {
    const users = await this.userModel.find().populate('roles');
    return users;
  }

  async getByUuid(param: any): Promise<any> {
    const users = await this.userModel.findOne(param);
    return users;
  }

  async updateByUuid(uuid: string, userDto: UsersDto): Promise<any | null> {
    const users = await this.userModel
      .findOneAndUpdate({ uuid }, userDto, {
        new: true,
      })
      .populate('roles');
    return users;
  }

  async deleteByUuid(uuid: string): Promise<any | null> {
    const users = await this.userModel.findOneAndDelete({ uuid });
    return users;
  }

  async getByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email });
  }

  //PARTE DEL SETTING//
  async updatePasswordByEmail(
    email: string,
    newPassword: string,
  ): Promise<any> {
    await this.userModel.updateOne({ email }, { password: newPassword });
  }

  async updateEmailByEmail(email: string, newEmail: string): Promise<any> {
    await this.userModel.updateOne({ email }, { email: newEmail });
  }
}
