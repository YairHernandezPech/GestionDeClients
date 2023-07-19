import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type UsersDocument = User & Document; 

@Schema() 
export class User {
  @Prop() 
  genre: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  pages: number;

  @Prop()
  image_url: string;

  @Prop([String]) 
  keywords: string[];
}

export const UserSchema = SchemaFactory.createForClass(User); 