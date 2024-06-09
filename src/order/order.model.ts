import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"
import { Event } from "src/event/event.model"
import { User } from "src/user/user.model"
export type OrderDocument = HydratedDocument<Order>
@Schema()
export class Order {
  @Prop({default: Date.now()})
  createdAt: Date

  @Prop()
  stripeId: string

  @Prop()
  totalAmount: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Event'})
  event: Event

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  buyer: User
}
export const OrderSchema = SchemaFactory.createForClass(Order)