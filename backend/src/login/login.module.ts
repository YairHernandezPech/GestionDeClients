import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SuperadminModule } from '../superadmin/superadmin.module';
import { LoginController } from './controller/login.controller';
import { LoginRepository } from './repository/login.repository';
import { LoginService } from './service/login.service';
import { Login, LoginSchema } from './model/login.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from '../login/strategies/jwt.strategy';
import { User, UserSchema } from 'src/users/model/Users';
import {
  Superadmin,
  SuperadminSchema,
} from 'src/superadmin/model/superadmin.model';
import { SuperadminRepository } from 'src/superadmin/repository/superadmin.repository';
import { SuperadminService } from 'src/superadmin/service/superadmin.service';
import { UsersService } from 'src/users/services/users.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { RolRepository } from 'src/rol/repository/rol.repository';
import { RolService } from 'src/rol/service/rol.service';
import { Rol, RolSchema } from 'src/rol/model/rol.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Login.name, schema: LoginSchema },
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
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    LoginRepository,
    JwtStrategy,
    ConfigService,
    SuperadminRepository,
    SuperadminService,
    UsersService,
    UsersRepository,
    RolRepository,
    RolService,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class LoginModule {}
