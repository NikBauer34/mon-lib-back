import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  name: string

  @Prop()
  surname: string

  @Prop()
  patronimyc: string

  @Prop()
  phone: string

  @Prop()
  email: string
}
export const UserSchema = SchemaFactory.createForClass(User)