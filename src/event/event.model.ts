import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
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

  @Prop(raw({
    monday: [{startDate: String, endDate: String, totalSpace: Number, peopleCount: Number}], 
    tuesday: [{startDate: String, endDate: String, totalSpace: Number, peopleCount: Number}], 
    wednesday: [{startDate: String, endDate: String, totalSpace: Number, peopleCount: Number}], 
    thursday: [{startDate: String, endDate: String, totalSpace: Number, peopleCount: Number}], 
    friday: [{startDate: String, endDate: String, totalSpace: Number, peopleCount: Number}], 
    saturday: [{startDate: String, endDate: String, totalSpace: Number, peopleCount: Number}], 
    sunday: [{startDate: String, endDate: String, totalSpace: Number, peopleCount: Number}]}))
  days: Record<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', [{startDate: string, endDate: string, totalSpace: number, peopleCount: number}]>
  @Prop()
  price: string

  @Prop({default: false})
  isFree: boolean

  @Prop({default: ''})
  phone: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category: Types.ObjectId

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Museum'})
  organizer: Types.ObjectId
}
export const EventSchema = SchemaFactory.createForClass(Event)