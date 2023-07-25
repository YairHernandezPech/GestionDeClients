import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SuperadminRepository } from '../repository/superadmin.repository';
import { Rol } from '../../rol/rol.enum';
import { SuperadminDto } from '../DTO/superadmin.dto';
import { RolRepository } from 'src/rol/repository/rol.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SuperadminService {
  constructor(
    private readonly superadminRepository: SuperadminRepository,
    private readonly rolRepository: RolRepository,
  ) {}

  async getall(): Promise<any[]> {
    try {
      const superadmins = await this.superadminRepository.get();
      const superadminsWithRoles = await Promise.all(
        superadmins.map(async (superadmin) => {
          const roles = await this.rolRepository.getRolesByIds(
            superadmin.roles,
          );
          return {
            ...superadmin.toJSON(),
            roles: roles.map((role) => role.role), // Obtener solo los nombres de los roles
          };
        }),
      );
      return superadminsWithRoles;
    } catch (error) {
      throw new Error('Error al buscar superadmins en la lista');
    }
  }

  async create(dto: SuperadminDto): Promise<any> {
    const exists = await this.superadminRepository.getByUuid(dto);
    if (exists) {
      throw new BadRequestException(
        'Ya existe un Superadmin con el mismo nombre o correo electrónico',
      );
    }
    const rolSuperadmin = await this.rolRepository.getOne({
      role: Rol.SUPERADMIN,
    });
    const rolAdmin = await this.rolRepository.getOne({
      role: Rol.ADMIN,
    });
    if (!rolSuperadmin || !rolAdmin) {
      throw new InternalServerErrorException(
        'los roles aún no han sido creados',
      );
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const superadmin = await this.superadminRepository.create({
      ...dto,
      password: hashedPassword,
    });
    superadmin.roles = [rolSuperadmin, rolAdmin];
    const savedSuperadmin = await superadmin.save();
    return savedSuperadmin;
  }

  async updateByUuid(
    uuid: string,
    superadminDto: SuperadminDto,
  ): Promise<any | null> {
    try {
      if (superadminDto.password) {
        const hashedPassword = await bcrypt.hash(superadminDto.password, 10);
        superadminDto.password = hashedPassword;
      }
      const updateSuperadmin = await this.superadminRepository.updateByUuid(
        uuid,
        superadminDto,
      );
      return updateSuperadmin;
    } catch (error) {
      throw new Error('Error updating superadmin');
    }
  }

  async deleteByUuid(uuid: string): Promise<any> {
    try {
      const superadmins = await this.superadminRepository.deleteByUuid(uuid);
      return superadmins;
    } catch (error) {
      throw new Error('Error deleting superadmin');
    }
  }

  async getByEmail(email: string): Promise<any> {
    return this.superadminRepository.getByEmail(email);
  }
}
