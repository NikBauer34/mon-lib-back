import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.model';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/user/user.model';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
              private eventService: EventService,
              private userService: UserService) {}

  async getAll() {
    const orders = await this.orderModel.find({})
    return orders
  }
  async create(dto: CreateOrderDto) {
    const order = await this.orderModel.create(dto)
    const event = await this.eventService.addOrder(dto.event, order._id)
    return order
  }
  async findById(_id: Types.ObjectId) {
    const order = await this.orderModel.findById(_id)

    return order
  }
  async getOrdersByUser(userId: Types.ObjectId, limit: number, page: number) {
    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await this.orderModel.distinct('event')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      let trueOrders = await Promise.all(orders.map(async (el) => {
        const event = await this.eventService.findById(el.event)
        const user = await this.userService.findById(event.organizer)
        return {el, event, user}
      }))

    const ordersCount = await this.orderModel.distinct('event').countDocuments(conditions)

    return { data: trueOrders, totalPages: Math.ceil(ordersCount / limit) }
  }
}
