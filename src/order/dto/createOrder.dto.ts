import { Types } from "mongoose"

export class CreateOrderDto {
  readonly createdAt?: Date
  readonly stripeId: string
  readonly totalAmount: string
  readonly event: Types.ObjectId
  readonly buyer: Types.ObjectId
}