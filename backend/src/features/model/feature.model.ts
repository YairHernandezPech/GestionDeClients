import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export type FeaturesDocument = Features & Document;

@Schema()
export class Features {
  @Prop({ type: String, default: uuidv4, unique: true })
  uuid: string;

  @Prop({ type: String, required: true, index: true })
  clientName: string;

  @Prop({
    type: Date,
    default: () => dayjs().format('YYYY-MM-DD'),
    required: true,
  })
  date: Date;

  @Prop({ type: String, required: true, index: true })
  status: string;

  @Prop({ type: String, required: true, index: true })
  paymentType: string;

  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: String, required: true })
  url: string;
}

export const FeaturesSchema = SchemaFactory.createForClass(Features);
