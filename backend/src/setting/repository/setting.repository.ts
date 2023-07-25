import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Setting, SettingDocument } from '../model/setting.model';

@Injectable()
export class SettingRepository {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  async findByEmail(email: string): Promise<any> {
    return this.settingModel.findOne({ email }).exec();
  }
}
