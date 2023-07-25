import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/Users';
import { RolRepository } from 'src/rol/repository/rol.repository';
import { RolModule } from 'src/rol/rol.module';
import { Rol, RolSchema } from 'src/rol/model/rol.model';
import { SuperadminRepository } from 'src/superadmin/repository/superadmin.repository';
import { SuperadminModule } from 'src/superadmin/superadmin.module';
import {
  Superadmin,
  SuperadminSchema,
} from 'src/superadmin/model/superadmin.model';

@Module({
  providers: [
    UsersService,
    UsersRepository,
    RolRepository,
    SuperadminRepository,
  ],
  controllers: [UsersController],
  imports: [
    SuperadminModule,
    RolModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Rol.name, schema: RolSchema },
      { name: Superadmin.name, schema: SuperadminSchema },
    ]),
  ],
})
export class UsersModule {}
