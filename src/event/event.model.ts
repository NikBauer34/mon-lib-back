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
    monday: [{startDate: Date, endDate: Date}], 
    tuesday: [{startDate: Date, endDate: Date}], 
    wednesday: [{startDate: Date, endDate: Date}], 
    thursday: [{startDate: Date, endDate: Date}], 
    friday: [{startDate: Date, endDate: Date}], 
    saturday: [{startDate: Date, endDate: Date}], 
    sunday: [{startDate: Date, endDate: Date}]}))
  days: Record<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', [{startDate: Date, endDate: Date}]>
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