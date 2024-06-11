import { Types } from "mongoose"

export class CreateOrderDto {
  readonly event: Types.ObjectId
  readonly buyer: Types.ObjectId
}