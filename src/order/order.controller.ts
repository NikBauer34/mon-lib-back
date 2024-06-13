import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Types } from 'mongoose';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService,
              
  ) {}

  @Post('/create')
  create(@Body() dto: CreateOrderDto) {
    console.log(dto)
    return this.orderService.create(dto)
  }
  @Post('/get-orders-by-user')
  getOrdersByUser(@Body() dto: {userId: Types.ObjectId, limit: number, page: number}) {
    return this.orderService.getOrdersByUser(dto.userId, dto.limit, dto.page)
  }
}
