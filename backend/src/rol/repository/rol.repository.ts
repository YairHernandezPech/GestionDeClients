import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RolDto } from '../DTO/rol.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rol, RolDocument } from '../model/rol.model';
import { Crud } from '../shared/CRUD';

@Injectable()
export class RolRepository implements Crud<RolDocument, RolDto> {
  constructor(
    @InjectModel(Rol.name) private readonly rolModel: Model<RolDocument>,
  ) {}

  async get(): Promise<RolDocument[]> {
    const roles = await this.rolModel.find();
    return roles;
  }

  async getOne(role: RolDto): Promise<RolDocument> {
    const roles = await this.rolModel.findOne({ role: role.role });
    return roles;
  }

  async create(rolDto: RolDto): Promise<RolDocument> {
    const newRol = await this.rolModel.create(rolDto);
    return newRol;
  }

  async deleteByUuid(uuid: string): Promise<RolDocument> {
    const roles = await this.rolModel.findOneAndDelete({ uuid });
    return roles;
  }

  async getRolesByIds(roleIds: string[]): Promise<RolDocument[]> {
    const roles = await this.rolModel.find({ _id: { $in: roleIds } });
    return roles;
  }
}
