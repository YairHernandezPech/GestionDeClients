import { Module } from '@nestjs/common';
import { ClientsController } from './controller/clients.controller';
import { ClientsRepository } from "./repository/clients.repository";
import { ClientsService } from './services/clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client,ClientSchema } from "./model/Clients";

@Module({
  controllers: [ClientsController],
  providers: [ClientsService,ClientsRepository],
  imports:[MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])]
})
export class ClientsModule {}
