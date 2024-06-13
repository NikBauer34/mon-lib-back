import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"
import { Event } from "src/event/event.model"
import { User } from "src/user/user.model"
export type OrderDocument = HydratedDocument<Order>
@Schema()
export class Order {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Event'})
  event: Types.ObjectId

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  buyer: Types.ObjectId

  @Prop()
  meetDate: Date
}
export const OrderSchema = SchemaFactory.createForClass(Order)