import { BadRequestException, Injectable } from '@nestjs/common';
import { RolRepository } from '../repository/rol.repository';
import { RolDocument } from '../model/rol.model';
import { RolDto } from '../DTO/rol.dto';

@Injectable()
export class RolService {
  constructor(private readonly rolRepository: RolRepository) {}

  async getall(): Promise<RolDocument[]> {
    try {
      const roles = await this.rolRepository.get();
      return roles;
    } catch (error) {
      throw new Error('Error al buscar roles en la lista');
    }
  }

  async create(obj: RolDto): Promise<RolDocument> {
    const exists = await this.rolRepository.getOne(obj);
    if (exists) {
      throw new BadRequestException('Ese rol ya existe');
    }
    const newRol = await this.rolRepository.create(obj);
    return newRol;
  }

  async deleteByUuid(uuid: string): Promise<RolDocument> {
    try {
      const roles = await this.rolRepository.deleteByUuid(uuid);
      return roles;
    } catch (error) {
      throw new Error('Error deleting rol');
    }
  }
}
