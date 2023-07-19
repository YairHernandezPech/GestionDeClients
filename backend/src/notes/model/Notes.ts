import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import * as dayjs from 'dayjs';

export type NotesDocument = Note & Document; 


@Schema() 
export class Note {
  @Prop({type: String, required: true}) 
  title: string;

  @Prop({type: String, required: true})
  note: string;

  @Prop({ type: Date, default: dayjs().format('YYYY-MM-DD')})
  createdAT: Date;

}


export const NoteSchema = SchemaFactory.createForClass(Note); 