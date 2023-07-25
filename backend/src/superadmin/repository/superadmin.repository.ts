import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Crud } from '../../shared/CRUDUser';
import { SuperadminDto } from '../DTO/superadmin.dto';
import { Superadmin, SuperadminDocument } from '../model/superadmin.model';

@Injectable()
export class SuperadminRepository
  implements Crud<SuperadminDocument, SuperadminDto>
{
  constructor(
    @InjectModel(Superadmin.name)
    private readonly superadminModel: Model<SuperadminDocument>,
  ) {}

  async get(): Promise<any[]> {
    const superadmins = await this.superadminModel.find().populate('roles');
    return superadmins;
  }

  async getByUuid(dto: SuperadminDto): Promise<any> {
    const { name, email } = dto;
    const superadmins = await this.superadminModel.findOne({
      $or: [{ name }, { email }],
    });
    return superadmins;
  }

  async create(superadminDto: SuperadminDto): Promise<any> {
    const newsuperadmin = await this.superadminModel.create(superadminDto);
    return newsuperadmin;
  }

  async updateByUuid(
    uuid: string,
    superadminDto: SuperadminDto,
  ): Promise<any | null> {
    const superadmins = await this.superadminModel
      .findOneAndUpdate({ uuid }, superadminDto, {
        new: true,
      })
      .populate('roles');
    return superadmins;
  }

  async deleteByUuid(uuid: string): Promise<any> {
    const superadmins = await this.superadminModel.findOneAndDelete({ uuid });
    return superadmins;
  }

  //PARTE DEL LOGIN//

  async getByEmail(email: string): Promise<any> {
    return this.superadminModel.findOne({ email });
  }

  //PARTE DEL SETTING//
  async updatePasswordByEmail(
    email: string,
    newPassword: string,
  ): Promise<any> {
    await this.superadminModel.updateOne({ email }, { password: newPassword });
  }

  async updateEmailByEmail(email: string, newEmail: string): Promise<any> {
    await this.superadminModel.updateOne({ email }, { email: newEmail });
  }
}
