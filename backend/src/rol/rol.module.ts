import { Module } from '@nestjs/common';
import { RolService } from './service/rol.service';
import { RolController } from './controller/rol.controller';
import { RolRepository } from '../rol/repository/rol.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from '../rol/model/rol.model';

@Module({
  providers: [RolService, RolRepository],
  controllers: [RolController],
  imports: [MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }])],
})
export class RolModule {}
