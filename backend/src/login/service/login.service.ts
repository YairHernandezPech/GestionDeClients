import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../DTO/login.dto';
import { SuperadminService } from '../../superadmin/service/superadmin.service';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { PayloadInterface } from '../interface/payload.interface';
@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly superadminService: SuperadminService,
    private readonly usersService: UsersService,
  ) {}

  async login(dto: LoginDto): Promise<any> {
    const { email, password } = dto;

    // Check if the user is a superadmin
    const superadmin = await this.superadminService.getByEmail(email);
    if (superadmin && (await bcrypt.compare(password, superadmin.password))) {
      const payload: PayloadInterface = {
        uuid: superadmin.uuid,
        userType: 'Superadmin',
        name: superadmin.name,
        telephone: superadmin.telephone,
        email: superadmin.email,
        department: superadmin.department,
        createdAt: superadmin.createdAt,
        updatedAt: superadmin.updatedAt,
        deleteAt: superadmin.deleteAt,
        roles: superadmin.roles,
      };

      const token = this.generateToken(payload);
      return { token };
    }

    // Check if the user is a regular user
    const user = await this.usersService.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: PayloadInterface = {
        uuid: user.uuid,
        userType: 'user Admin',
        name: user.name,
        telephone: user.telephone,
        email: user.email,
        department: user.department,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deleteAt: user.deleteAt,
        roles: user.roles,
      };
      const token = this.generateToken(payload);
      return { token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  generateToken(payload: PayloadInterface): string {
    return this.jwtService.sign(payload);
  }
}
