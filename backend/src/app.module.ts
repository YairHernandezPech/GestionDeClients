import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { DocumentsModule } from './documents/documents.module';
import { RolModule } from './rol/rol.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { LoginModule } from './login/login.module';
import { SettingModule } from './setting/setting.module';
import { FeaturesModule } from './features/features.module';
config();

@Module({
  imports: [NotesModule,ClientsModule, UsersModule, MongooseModule.forRoot(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Aumenta el tiempo de espera de conexión a 30 segundos
    socketTimeoutMS: 30000,
  }), DocumentsModule, RolModule, SuperadminModule, LoginModule, SettingModule, FeaturesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
