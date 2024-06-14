import { ApiProperty } from "@nestjs/swagger"
import { Types } from "mongoose"

export class CreateOrderDto {
  @ApiProperty({description: 'Событие заказа'})
  readonly event: Types.ObjectId
  @ApiProperty({description: 'Покупатель музея'})
  readonly buyer: Types.ObjectId
  @ApiProperty({description: 'Время выхода'})
  readonly meetDate: Date
}