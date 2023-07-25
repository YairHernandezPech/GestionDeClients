import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { SuperadminService } from '../../superadmin/service/superadmin.service';
import * as bcrypt from 'bcrypt';
import { SettingDto } from '../DTO/setting.dto';
import { JwtService } from '@nestjs/jwt';
import { SettingRepository } from '../repository/setting.repository';
import { PayloadInterface } from 'src/login/interface/payload.interface';
import { UsersRepository } from '../../users/repository/users.repository';
import { SuperadminRepository } from '../../superadmin/repository/superadmin.repository';

@Injectable()
export class SettingService {
  constructor(
    private readonly usersService: UsersService,
    private readonly superadminService: SuperadminService,
    private readonly jwtService: JwtService,
    private readonly settingRepository: SettingRepository,
    private readonly usersRepository: UsersRepository,
    private readonly superadminRepository: SuperadminRepository,
  ) {}

  async getSetting(email: string) {
    const user = await this.usersService.getByEmail(email);
    const superadmin = await this.superadminService.getByEmail(email);

    if (user) {
      return {
        userType: 'user Admin',
        name: user.name,
        email: user.email,
        telephone: user.telephone,
        department: user.department,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roles: user.roles,
      };
    } else if (superadmin) {
      return {
        userType: 'Superadmin',
        name: superadmin.name,
        email: superadmin.email,
        telephone: superadmin.telephone,
        department: superadmin.department,
        createdAt: superadmin.createdAt,
        updatedAt: superadmin.updatedAt,
        roles: superadmin.roles,
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async updateSetting(email: string, dto: SettingDto) {
    const user = await this.usersService.getByEmail(email);
    const superadmin = await this.superadminService.getByEmail(email);

    if (user) {
      if (!(await bcrypt.compare(dto.password, user.password))) {
        throw new UnauthorizedException('Invalid password');
      }

      if (dto.newEmail) {
        await this.usersRepository.updateEmailByEmail(email, dto.newEmail);
        email = dto.newEmail;
      }

      const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
      await this.usersRepository.updatePasswordByEmail(email, hashedPassword);

      const payload: PayloadInterface = {
        email: user.email,
        uuid: user.uuid,
        name: user.name,
        telephone: user.telephone,
        department: user.department,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deleteAt: user.deleteAt,
        roles: user.roles,
        userType: 'user Admin',
      };
      const token = this.generateToken(payload);

      return { token };
    } else if (superadmin) {
      if (!(await bcrypt.compare(dto.password, superadmin.password))) {
        throw new UnauthorizedException('Invalid password');
      }

      if (dto.newEmail) {
        await this.superadminRepository.updateEmailByEmail(email, dto.newEmail);
        email = dto.newEmail;
      }

      const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

      await this.superadminRepository.updatePasswordByEmail(
        email,
        hashedPassword,
      );

      const payload: PayloadInterface = {
        email: superadmin.email,
        uuid: superadmin.uuid,
        name: superadmin.name,
        telephone: superadmin.telephone,
        department: superadmin.department,
        createdAt: superadmin.createdAt,
        updatedAt: superadmin.updatedAt,
        deleteAt: superadmin.deleteAt,
        roles: superadmin.roles,
        userType: 'Superadmin',
      };
      const token = this.generateToken(payload);

      return { token };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  generateToken(payload: PayloadInterface): string {
    return this.jwtService.sign(payload);
  }
}
