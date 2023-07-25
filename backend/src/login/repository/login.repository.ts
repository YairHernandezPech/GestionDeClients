import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login, LoginDocument } from '../model/login.model';

@Injectable()
export class LoginRepository {
  constructor(
    @InjectModel(Login.name)
    private readonly loginModel: Model<LoginDocument>,
  ) {}

  async findByEmail(email: string): Promise<Login | null> {
    return this.loginModel.findOne({ email }).exec();
  }
}
