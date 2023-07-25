import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { v4 } from 'uuid';
import * as dayjs from 'dayjs';

export type SuperadminDocument = Superadmin & Document;

@Schema()
export class Superadmin {
  @Prop({ type: String, default: v4, unique: true })
  uuid: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, index: true })
  telephone: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, index: true })
  department: string;

  @Prop({ type: String, required: true, index: true })
  password: string;

  @Prop({ type: Date, default: () => dayjs().format('YYYY-MM-DD') })
  createdAt: Date;

  @Prop({ type: Date, default: () => dayjs().format('YYYY-MM-DD') })
  updatedAt: Date;

  @Prop({ type: Date, default: () => dayjs().format('YYYY-MM-DD') })
  deletedAt: Date;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Rol', default: [] }] })
  roles: string[]; // Cambiar el tipo a una matriz de cadenas
}

export const SuperadminSchema = SchemaFactory.createForClass(Superadmin);
