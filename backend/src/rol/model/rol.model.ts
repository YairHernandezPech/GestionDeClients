import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

export type RolDocument = Rol & Document;

@Schema()
export class Rol {
  @Prop({ type: String, default: v4, unique: true })
  uuid: string;

  @Prop({ type: String, required: true, index: true })
  role: Rol;
}

export const RolSchema = SchemaFactory.createForClass(Rol);
