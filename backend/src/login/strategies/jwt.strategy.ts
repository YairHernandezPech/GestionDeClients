import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PayloadInterface } from '../interface/payload.interface';
import { ConfigService } from '@nestjs/config';
import { SuperadminService } from '../../superadmin/service/superadmin.service';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly superadminService: SuperadminService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadInterface): Promise<any> {
    const { email } = payload;

    // Check if the user is a superadmin
    const superadmin = await this.superadminService.getByEmail(email);
    if (superadmin) {
      const superadminPayload: PayloadInterface = {
        ...payload,
        uuid: superadmin.uuid,
        userType: 'Superadmin',
        telephone: superadmin.telephone,
        department: superadmin.department,
        createdAt: superadmin.createdAt,
        updatedAt: superadmin.updatedAt,
        deleteAt: superadmin.deleteAt,
        roles: superadmin.roles,
      };
      return superadminPayload;
    }

    // Check if the user is a regular user
    const user = await this.usersService.getByEmail(email);
    if (user) {
      const userPayload: PayloadInterface = {
        ...payload,
        uuid: user.uuid,
        userType: 'user Admin',
        telephone: user.telephone,
        department: user.department,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deleteAt: user.deleteAt,
        roles: user.roles,
      };
      return userPayload;
    }

    throw new UnauthorizedException('Invalid token');
  }
}
