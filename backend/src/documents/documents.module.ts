import { Module } from '@nestjs/common';
import { DocumentsController } from './controller/documents.controller';
import { DocumentsService } from './services/documents.service';
import { AwsConfig } from "../documents/aws.confing";
import { ConfigModule } from '@nestjs/config';
import { DocumentsRepository } from "../documents/repository/documents.repository";
import { MongooseModule } from '@nestjs/mongoose';
import { Documents, DocumentsSchema } from "./model/Documents";
import { Client, ClientSchema } from "../clients/model/Clients";


@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forFeature([
    { name: Documents.name, schema: DocumentsSchema },
    { name: Client.name, schema: ClientSchema}
  ])],
  controllers: [DocumentsController],
  providers: [DocumentsService,AwsConfig,DocumentsRepository]
})
export class DocumentsModule {}
