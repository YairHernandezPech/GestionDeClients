import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersDto } from '../DTO/createDTO';
import { UsersRepository } from '../repository/users.repository';
import { orderUser } from '../../utils/orderUsers';
import * as bcrypt from 'bcrypt';
import { RolRepository } from 'src/rol/repository/rol.repository';
import { Rol } from '../../rol/rol.enum';
import { createSearch } from '../../utils/buscadorUsers';
import {
  Superadmin,
  SuperadminDocument,
} from '../../superadmin/model/superadmin.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolRepository: RolRepository,
    @InjectModel(Superadmin.name)
    private readonly superadminModel: Model<SuperadminDocument>,
  ) {}

  async create(dto: UsersDto): Promise<any> {
    const existingUser = await this.usersRepository.getByUuid({
      name: dto.name,
    });
    if (existingUser) {
      throw new BadRequestException('Ya existe un usuario con el mismo nombre');
    }

    const existingEmail = await this.usersRepository.getByUuid({
      email: dto.email,
    });
    if (existingEmail) {
      throw new BadRequestException(
        'Ya existe un usuario con el mismo correo electrónico',
      );
    }

    const existingSuperadmin = await this.superadminModel.findOne({
      $or: [{ name: dto.name }, { email: dto.email }],
    });
    if (existingSuperadmin) {
      throw new BadRequestException(
        'El nombre o correo electrónico ya está en uso por un Superadmin',
      );
    }

    const rolAdmin = await this.rolRepository.getOne({
      role: Rol.ADMIN,
    });
    if (!rolAdmin) {
      throw new InternalServerErrorException(
        'Los roles aún no han sido creados',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    user.roles = [rolAdmin];
    const savedUser = await user.save();
    return savedUser;
  }

  async getall(): Promise<any[]> {
    try {
      const user = await this.usersRepository.get();
      const sortedUsers = orderUser(user);
      const usersWithRoles = await Promise.all(
        sortedUsers.map(async (user) => {
          const roles = await this.rolRepository.getRolesByIds(user.roles);
          return {
            ...user.toJSON(),
            roles: roles.map((role) => role.role),
          };
        }),
      );
      return usersWithRoles;
    } catch (error) {
      throw new Error('Error retrieving users');
    }
  }

  async searchUser(valor): Promise<any> {
    try {
      const param = createSearch(valor);
      const user = await this.usersRepository.getByUuid(param);
      return user;
    } catch (error) {
      throw new Error('Error searching user');
    }
  }

  async updateByUuid(uuid: string, dto: UsersDto): Promise<any | null> {
    try {
      // Encriptar la nueva contraseña
      if (dto.password) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        dto.password = hashedPassword;
      }
      const updateUser = await this.usersRepository.updateByUuid(uuid, dto);
      return updateUser;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  async deleteByUuid(uuid: string): Promise<any | null> {
    try {
      const user = await this.usersRepository.deleteByUuid(uuid);
      return user;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

  async getByEmail(email: string): Promise<any> {
    return this.usersRepository.getByEmail(email);
  }
}
