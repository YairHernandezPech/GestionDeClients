import { Module } from '@nestjs/common';
import { SettingController } from './controller/setting.controller';
import { SettingService } from './service/setting.service';
import { SettingRepository } from './repository/setting.repository';
import { SuperadminRepository } from 'src/superadmin/repository/superadmin.repository';
import { SuperadminService } from 'src/superadmin/service/superadmin.service';
import { UsersService } from 'src/users/services/users.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { RolRepository } from 'src/rol/repository/rol.repository';
import { RolService } from 'src/rol/service/rol.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './model/setting.model';
import { User, UserSchema } from 'src/users/model/Users';
import {
  Superadmin,
  SuperadminSchema,
} from 'src/superadmin/model/superadmin.model';
import { Rol, RolSchema } from 'src/rol/model/rol.model';
import { SuperadminModule } from 'src/superadmin/superadmin.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginModule } from '../login/login.module';
import { JwtStrategy } from '../login/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Setting.name, schema: SettingSchema },
      { name: User.name, schema: UserSchema },
      { name: Superadmin.name, schema: SuperadminSchema },
      { name: Rol.name, schema: RolSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    SuperadminModule,
    UsersModule,
    LoginModule,
  ],
  controllers: [SettingController],
  providers: [
    SettingService,
    SettingRepository,
    SuperadminRepository,
    SuperadminService,
    UsersService,
    UsersRepository,
    RolRepository,
    RolService,
    JwtStrategy,
    ConfigService,
  ],
})
export class SettingModule {}
