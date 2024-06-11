import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Category } from "src/category/category.model";
import { User } from "src/user/user.model";

export type EventDocument = HydratedDocument<Event>

@Schema()
export class Event {
  @Prop()
  title: string

  @Prop()
  description: string
  @Prop()
  location: string

  @Prop({default: Date.now()})
  createdAt: Date

  @Prop()
  imageURL: string

  @Prop({default: Date.now()})
  startDateTime: Date

  @Prop({default: Date.now()})
  endDateTime: Date

  @Prop()
  price: string

  @Prop({default: false})
  isFree: boolean

  @Prop({default: ''})
  url: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category: Types.ObjectId

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Museum'})
  organizer: Types.ObjectId
}
export const EventSchema = SchemaFactory.createForClass(Event)