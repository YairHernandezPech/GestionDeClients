import { Module } from '@nestjs/common';
import { SuperadminService } from '../superadmin/service/superadmin.service';
import { SuperadminController } from '../superadmin/controller/superadmin.controller';
import { SuperadminRepository } from '../superadmin/repository/superadmin.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Superadmin,
  SuperadminSchema,
} from '../superadmin/model/superadmin.model';
import { RolRepository } from '../rol/repository/rol.repository';
import { RolModule } from '../rol/rol.module';
import { Rol, RolSchema } from 'src/rol/model/rol.model';

@Module({
  providers: [SuperadminService, SuperadminRepository, RolRepository],
  controllers: [SuperadminController],
  imports: [
    RolModule,
    MongooseModule.forFeature([
      { name: Superadmin.name, schema: SuperadminSchema },
      { name: Rol.name, schema: RolSchema },
    ]),
  ],
})
export class SuperadminModule {}
