import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.model';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getAll() {
    const orders = await this.orderModel.find({})
    return orders
  }
  async create(dto: CreateOrderDto) {
    const order = await this.orderModel.create(dto)
    return order
  }
  async findById(_id: Types.ObjectId) {
    const order = await this.orderModel.findById(_id)
    return order
  }
}
