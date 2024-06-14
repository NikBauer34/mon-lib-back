import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.model';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/user/user.model';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ExcelService } from 'src/excel/excel.service';
import { MuseumService } from 'src/museum/museum.service';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
              private eventService: EventService,
              private userService: UserService,
              private jwtService: JwtService,
              private excelService: ExcelService,
              private museumService: MuseumService) {}

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
    console.log('jhfjh')
    console.log(user_db)
    let order = await this.orderModel.findOne({event: event_id, buyer: user_db._id})
    console.log(order)
    if (order) {
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
  async getExcelTables(eventId: Types.ObjectId) {
    const conditions = { event: eventId}
    let event = await this.eventService.findById(eventId)
    let space: [Date, number, number][] = []
    let orders = await this.orderModel.find(conditions).sort('meetDate')
    for (let i in orders) {
      for (let j in space) {
        if (orders[i].meetDate == space[j][0]) {
          space[j][1] +=1
          let dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][space[j][0].getDay()]
          let Hours = space[j][0].getHours() + ' ' + space[j][0].getMinutes()
          let el = event.days[dayOfWeek].find((el)=> (el.startDate + ' ' + el.endDate) === Hours )
          space[j][2] = el.totalSpace
          continue
        }
        let date = orders[i].meetDate
        let dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][space[j][0].getDay()]
        let Hours = date.getHours() + ' ' + date.getMinutes()
        let el = event.days[dayOfWeek].find((el)=> (el.startDate + ' ' + el.endDate) === Hours )
        space.push([date, 0, el.totalSpace])
      }
    }
    let people: [string, string, string][] = []
    people = await Promise.all(orders.map(async (el) => {
      let user = await this.userService.findById(el.buyer)
      return [`${user.name} ${user.surname} ${user.patronimyc}`, user.email, user.phone]
    }))
    const file_name = await this.excelService.createOrderXLSX(space, people)
    return file_name.file_path
  }
}
