import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from "uuid";

export type DocumentsDocument = Documents & Document; 


@Schema() 
export class Documents {
  @Prop({type: String, default: () => uuidv4(), index: true}) 
  uuid: string;

  @Prop({type: String, required: true}) 
  name: string;

  @Prop({type: String, required: true})
  status: string;

  @Prop({type: String, required: true})
  type: string;
  
  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: Date, default: dayjs().format('YYYY-MM-DD')})
  createdAT: Date;

}


export const DocumentsSchema = SchemaFactory.createForClass(Documents); 