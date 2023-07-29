import { Module } from '@nestjs/common';
import { NotesController } from './controller/notes.controller';
import { NotesRepository } from "./repository/notes.repository";
import { NotesService } from './services/notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note,NoteSchema } from "./model/Notes";
import { Client, ClientSchema } from "../clients/model/Clients";

@Module({
  controllers: [NotesController],
  providers: [NotesService,NotesRepository],
  imports:[MongooseModule.forFeature([
    { name: Note.name, schema: NoteSchema },
    { name: Client.name, schema: ClientSchema}
  ])]
})
export class NotesModule {}
