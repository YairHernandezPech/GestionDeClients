import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from "uuid";
import { Documents,DocumentsSchema } from "../../documents/model/Documents";
import { Note,NoteSchema } from "../../notes/model/Notes";

export type ClientsDocument = Client & Document; 

@Schema() 
export class Client {
  @Prop({type: String, default: () => uuidv4(), index: true}) 
  uuid: string;

  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String, required: true})
  lastName: string;

  @Prop({type: String, required: true})
  address: string;

  @Prop({type: Number, required: true})
  phone: number;

  @Prop({type: Number, required: true})
  age: number;

  @Prop({type: String, required: true})
  email: string;

  @Prop({type: String, required: true})
  customerType: string;

  @Prop({ type: String, default: dayjs().format('YYYY-MM-DD')})
  createdAT: string;

  @Prop({ type: [DocumentsSchema] })
  documents: Documents[];

  @Prop({ type: [NoteSchema] })
  notes: Note[];

}

export const ClientSchema = SchemaFactory.createForClass(Client); 