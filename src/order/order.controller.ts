import { Body, Controller, Post, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Заказы')
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
  @Post('/get-orders-by-event')
  getOrdersByEvent(@Body() dto: {eventId: Types.ObjectId, searchString: string}) {
    return this.orderService.getOrdersByEvent(dto.eventId, dto.searchString)
  }
  @Post('is-subscribed')
  isSubscribed(@Body() dto: {eventId: Types.ObjectId}, @Headers() headers: Record<string, string>) {
    return this.orderService.isSubscribed(dto.eventId, headers.authorization)
  }
  @Post('get-excel-tables')
  getExcelTables(@Body() dto: {eventId: Types.ObjectId}) {
    return this.orderService.getExcelTables(dto.eventId)
  }
}
