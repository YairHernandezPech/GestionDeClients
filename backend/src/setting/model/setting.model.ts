import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  newEmail: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  newPassword: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
