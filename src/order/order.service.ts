import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.model';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/user/user.model';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
              private eventService: EventService,
              private userService: UserService,
              private jwtService: JwtService) {}

  async getAll() {
    const orders = await this.orderModel.find({})
    return orders
  }
  async create(dto: CreateOrderDto) {
    console.log(dto)
    const order = await this.orderModel.create(dto)
    const event = await this.eventService.addOrder(dto.event, order._id)
    order.event = event._id
    await order.save()
    return order
  }
  async findById(_id: Types.ObjectId) {
    const order = await this.orderModel.findById(_id)

    return order
  }
  async getOrdersByUser(userId: Types.ObjectId, limit: number, page: number) {
    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await this.orderModel.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
    console.log(orders)
    let trueOrders = await Promise.all(orders.map(async (el) => {
      console.log(el)
      const event = await this.eventService.findById(el.event)
      const user = await this.userService.findById(el.buyer)
      return {el, event, user}
    }))

    const ordersCount = await this.orderModel.countDocuments(conditions)
    console.log('trueor')
    console.log(trueOrders)
    return { data: trueOrders, totalPages: Math.ceil(ordersCount / limit) }
  }
  async getOrdersByEvent(event_id: Types.ObjectId, search: string) {
    const conditions = { event: event_id }
    const orders = await this.orderModel.find(conditions)
    let FullOrders = await Promise.all(orders.map(async (el) => {
      let event = await this.eventService.findById(el.event)
      let buyer = await this.userService.findById(el.buyer)
      return {order: el, event, buyer}
    }))
    let searched_Orders = FullOrders.filter((el) => (el.buyer.name + ' ' + el.buyer.surname + ' ' + el.buyer.patronimyc).includes(search))
    return searched_Orders
  }
  async isSubscribed(event_id: Types.ObjectId, access: string) {
    console.log(access, event_id)
    const user = this.jwtService.verify(access, {secret: 'secret2'})
    let user_db = await this.userService.findById(user._id)
    let order = await this.orderModel.findOne({event: event_id})
    if (order.buyer.equals(user_db._id)) {
      console.log(order)
      console.log({date: order.meetDate})
      return {date: order.meetDate}
    } else {
      console.log('h')
      console.log(order)
      console.log(user_db)
      return null
    }
  }
}
